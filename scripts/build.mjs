// Builds the site served at anoni.net/mystery into dist/mystery/: the lobby at the top,
// and each case under its slug (cases/*/case.json), e.g. dist/mystery/night-heron/.
// 正體中文 is at the top; 简体中文 lives under zh-cn/ and English under en/
// (dist/mystery/en/, dist/mystery/en/night-heron/), each built when the case has that
// language's files (case.<lang>.js, web/ui.<lang>.js, solution.<lang>.enc).
// Every case's interactive page is the shared engine (engine/index.src.html with the
// engine's interface text) plus the case's own files: case.js (story data), web/ui.<lang>.js
// (its interface text), web/game.js (its behaviour), web/sites.css and web/assets/.
// Usage: [CASE_KEY=<culprit name>] node scripts/build.mjs [--target clearnet|onion] [--out <dir>] [--fragment <file>] [--drafts]
//   --target clearnet adds anoni.net's self-hosted Umami to the interactive page
//   (scripts/analytics.html). --target onion rewrites links to anoni.net, and the feedback
//   page's form server, into the onion addresses and loads no analytics. Without --target the build has neither, which is
//   what local previews and other hosts want.
//   --out writes somewhere other than dist/mystery/.
//   --fragment also writes the Chinese page without the <html>/<head> wrapper (for previews
//   that supply their own document skeleton).
// The interactive page needs no key: the encrypted solution is embedded as is.
// The static version (static/) and the PDF are built only when the case's key is set,
// because their endings are plain text: CASE_KEY for case 01, CASE_KEY_<number> for the
// others (CASE_KEY_02). Deployments should always set them. Every language's solution is
// encrypted with the same key (the culprit's Chinese name). Only cases whose case.json has
// "printEditions": true have a static version and a PDF so far.
import { readFileSync, writeFileSync, mkdirSync, cpSync, statSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';
import { decryptB64 } from './crypt.mjs';
import { buildLobby } from './lobby.mjs';
import { buildFeedback } from './feedback.mjs';
import { iconTags, ogTags, swScript, SITE_NAME, LANG_INFO, langLinks } from './meta.mjs';
import { createHash } from 'node:crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// Every case folder with a case.json shows up in the lobby; those with web/game.js are built.
// A case marked "draft" in its case.json is left out unless --drafts is given (local previews).
const drafts = process.argv.includes('--drafts');
const caseDirs = readdirSync(join(root, 'cases')).sort()
  .filter(d => existsSync(join(root, 'cases', d, 'case.json'))).map(d => join(root, 'cases', d))
  .filter(d => drafts || !JSON.parse(readFileSync(join(d, 'case.json'), 'utf8')).draft);
const cases = caseDirs.map(d => JSON.parse(readFileSync(join(d, 'case.json'), 'utf8')));
const arg = name => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
const out = arg('--out') ? resolve(arg('--out')) : join(root, 'dist', 'mystery');

const ONION = 'anoninetru5tflukgfaehun7q6khowgmymcff3gtk5oyesqazhmfxtyd.onion';
const TARGETS = {
  clearnet: {
    analytics: {
      __SRC__: 'https://aa.anoni.net/script.js',
      __WEBSITE_ID__: '022770f1-1c57-435f-a4c0-93480a1b8929',  // anoni-net-mystery
      __DOMAINS__: 'anoni.net',  // other hosts (previews) send nothing
    },
  },
  onion: {
    // First match wins, so the root address goes last
    rewrites: [
      ['https://anoni.net/docs/', `http://docs.${ONION}/`],
      ['https://anoni.net/news/', `http://news.${ONION}/`],
      ['https://anoni.net/mystery/', `http://mystery.${ONION}/`],
      ['https://form.anoni.net/', `http://form.${ONION}/`],  // the feedback page posts here
      ['https://anoni.net/', `http://${ONION}/`],
    ],
  },
};
const targetName = arg('--target');
if (targetName && !TARGETS[targetName]) { console.error('unknown --target ' + targetName); process.exit(1); }
const target = TARGETS[targetName] || {};

// Chinese at the top of the site; other languages under their code, when the case has them
const LANGS = [
  { code: 'zh', dir: '', caseFile: 'case.js', ui: 'ui.zh.js', solution: 'solution.enc' },
  { code: 'zh-cn', dir: 'zh-cn', caseFile: 'case.zh-cn.js', ui: 'ui.zh-cn.js', solution: 'solution.zh-cn.enc' },
  { code: 'en', dir: 'en', caseFile: 'case.en.js', ui: 'ui.en.js', solution: 'solution.en.enc' },
];
const langsOf = caseDir => LANGS.filter(l => [join(caseDir, l.caseFile), join(caseDir, 'web', l.ui), join(caseDir, l.solution)].every(existsSync));
const keyOf = m => (process.env[m.number === '01' ? 'CASE_KEY' : 'CASE_KEY_' + m.number] || '').trim();
const kb = file => Math.max(1, Math.round(statSync(file).size / 1024)) + ' KB';
const listFiles = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? listFiles(join(dir, e.name)).map(f => e.name + '/' + f) : [e.name]);

let analytics = '';
if (target.analytics) {
  analytics = readFileSync(join(root, 'scripts', 'analytics.html'), 'utf8').trim() + '\n';
  for (const [token, value] of Object.entries(target.analytics)) analytics = analytics.split(token).join(value);
}

rmSync(out, { recursive: true, force: true });
// Icons and the lobby's preview images sit at the top of the site (made by scripts/make_og.mjs)
mkdirSync(out, { recursive: true });
cpSync(join(root, 'site'), out, { recursive: true });
// Each case with print editions lays them out in its own print/static.mjs and print/pdf.mjs
const printers = {};
for (const caseDir of caseDirs) {
  const dir = join(caseDir, 'print');
  if (existsSync(join(dir, 'static.mjs'))) printers[caseDir] = {
    static: (await import(pathToFileURL(join(dir, 'static.mjs')).href)).buildStatic,
    pdf: (await import(pathToFileURL(join(dir, 'pdf.mjs')).href)).buildPdf,
  };
}
let fragment = '';
const built = [];  // { lang, slug, assets } for the service worker
const anyLangs = new Set();

caseDirs.forEach((caseDir, ci) => {
  const manifest = cases[ci];
  const web = join(caseDir, 'web');
  if (!existsSync(join(web, 'game.js'))) return;
  const key = keyOf(manifest);
  // The static version and the PDF hold the ending, so they need the key. Without it the case
  // is built as if it had no print editions yet: no links to them anywhere, lobby included.
  if (manifest.printEditions && !key) {
    console.warn(`${manifest.slug}: key not set (${manifest.number === '01' ? 'CASE_KEY' : 'CASE_KEY_' + manifest.number}), built without the static version and the PDF.`);
    manifest.printEditions = false;
  }
  const assets = existsSync(join(web, 'assets')) ? listFiles(join(web, 'assets')) : [];
  const assetSizes = Object.fromEntries(assets.map(f => [f, kb(join(web, 'assets', f))]));
  const caseMeta = { slug: manifest.slug, number: manifest.number, pdf: manifest.pdf,
    saveKey: manifest.saveKey || `mystery-${manifest.slug}-v1`, seenKey: manifest.seenKey || `mystery-${manifest.slug}-seen` };

  for (const lang of langsOf(caseDir)) {
    anyLangs.add(lang.code);
    const blob = readFileSync(join(caseDir, lang.solution), 'utf8').trim();
    if (key && decryptB64(blob, key) == null) { console.error(`${manifest.slug}: the key does not decrypt ${lang.solution}`); process.exit(1); }
    // the engine's interface text, then the case's on top of it
    const uiCode = readFileSync(join(root, 'engine', lang.ui), 'utf8') + '\n' + readFileSync(join(web, lang.ui), 'utf8');
    const UI = vm.runInNewContext(`${uiCode}\n;UI`);

    // Editions this case has: links to the others are left out of the page
    const has = { static: !!manifest.printEditions, nostatic: !manifest.printEditions };
    const caseLangs = langsOf(caseDir).map(l => l.code);
    // {{key}} in the page template takes the interface text for this language (filled before
    // the UI, case and CSS files are inlined, so their own text is never touched)
    let page = readFileSync(join(root, 'engine', 'index.src.html'), 'utf8')
      .replace(/<!--if:(\w+)-->([\s\S]*?)<!--end:\1-->/g, (_, k, inner) => has[k] ? inner : '')
      .replace(/\{\{(\w+)\}\}/g, (_, k) => {
        if (typeof UI[k] !== 'string') throw new Error(`${manifest.slug} ${lang.ui}: missing text for {{${k}}}`);
        return UI[k];
      })
      .replace('/*__UI__*/', () => uiCode)
      .replace('/*__CASE__*/', () => readFileSync(join(caseDir, lang.caseFile), 'utf8'))
      .replace('/*__GAME__*/', () => readFileSync(join(web, 'game.js'), 'utf8'))
      .replace('/*__SITES_CSS__*/', () => readFileSync(join(web, 'sites.css'), 'utf8'));
    const fill = (token, value) => {
      if (!page.includes(token)) throw new Error('missing placeholder ' + token);
      page = page.split(token).join(value);
    };
    fill('__BLOB__', blob);
    fill('__CASE_META__', JSON.stringify(caseMeta));
    fill('__ASSET_SIZES__', JSON.stringify(assetSizes));
    if (page.includes('__PDF__')) fill('__PDF__', manifest.pdf);  // only cases with a PDF link it
    fill('__LANG_LINKS__', langLinks(caseLangs, lang.code, lang.dir ? '../../' : '../', l => LANG_INFO[l].dir + manifest.slug + '/', 'menu-btn').join('\n    '));
    fill('/*__SW__*/', swScript(lang.dir ? '../../' : '../', lang.code));
    if (lang.code === 'zh' && !fragment) fragment = page;

    const cut = page.indexOf('</style>') + '</style>'.length;
    const casePath = (lang.dir ? lang.dir + '/' : '') + manifest.slug + '/';
    const doc = `<!doctype html>
<html lang="${UI.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content">
<meta name="referrer" content="no-referrer">
<meta name="description" content="${UI.description}">
${iconTags(lang.dir ? '../../' : '../', lang.code, '#232d39')}
${ogTags({ lang: lang.code, siteName: SITE_NAME[lang.code], title: UI.caseTitle, desc: UI.description, path: casePath, image: casePath + 'og.png' })}
${analytics}${page.slice(0, cut).trim()}
</head>
<body>
${page.slice(cut).trim()}
</body>
</html>
`;

    const caseOut = join(out, lang.dir, manifest.slug);
    mkdirSync(caseOut, { recursive: true });
    writeFileSync(join(caseOut, 'index.html'), doc);
    if (assets.length) cpSync(join(web, 'assets'), join(caseOut, 'assets'), { recursive: true });
    const og = join(caseDir, lang.code === 'zh' ? 'og.png' : `og.${lang.code}.png`);
    if (existsSync(og)) cpSync(og, join(caseOut, 'og.png'));
    built.push({ lang, slug: manifest.slug, assets });

    if (key && manifest.printEditions) {
      if (!printers[caseDir]) throw new Error(`${manifest.slug}: printEditions is set but print/static.mjs and print/pdf.mjs are missing`);
      const solution = decryptB64(blob, key);
      const pages = printers[caseDir].static({
        caseDir, out: caseOut, lang: lang.code, langs: caseLangs,
        sitesCss: readFileSync(join(web, 'sites.css'), 'utf8'),
        solution, assetSizes,
      });
      console.log(`built ${manifest.slug} ${lang.code} static version: ${pages} pages`);
      // The print source holds the ending in plain text: keep it outside the served site
      const { pdf, html } = printers[caseDir].pdf({ caseDir, out: caseOut, lang: lang.code, srcDir: join(out, '..', 'pdf-src', manifest.slug, lang.code), solution, assetSizes });
      if (pdf) console.log('built', pdf);
      else console.warn(`No Chromium-based browser found (set CHROME_PATH): skipped the ${manifest.slug} ${lang.code} PDF. Print source: ${html}`);
    }
  }
});
// One lobby per language, listing every case, and the feedback page (scripts/feedback.mjs)
const lobbyLangs = LANGS.filter(l => anyLangs.has(l.code));
for (const lang of lobbyLangs) {
  buildLobby({ out: join(out, lang.dir), cases, analytics, lang: lang.code, langs: lobbyLangs.map(l => l.code) });
  const listed = cases.filter(c => lang.code === 'zh' || (c.i18n || {})[lang.code]).map(c => Object.assign({}, c, (c.i18n || {})[lang.code] || {}));
  buildFeedback({ out: join(out, lang.dir), cases: listed, analytics, lang: lang.code });
}

if (target.rewrites) {
  const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : []);
  for (const file of walk(out)) {
    let html = readFileSync(file, 'utf8');
    for (const [from, to] of target.rewrites) html = html.split(from).join(to);
    writeFileSync(file, html);
  }
}

// The service worker (scripts/sw.js): for each language, the files it keeps for offline play,
// and a version that changes whenever one of them does
{
  const shared = ['favicon.svg', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png'];
  const lists = Object.fromEntries(LANGS.filter(l => anyLangs.has(l.code)).map(l => {
    const p = l.dir ? l.dir + '/' : '';
    const pages = built.filter(b => b.lang.code === l.code).flatMap(b => [`${p}${b.slug}/`, ...b.assets.map(f => `${p}${b.slug}/assets/${f}`)]);
    return [p, [p, `${p}manifest.webmanifest`, ...pages, ...shared]];
  }));
  const hash = createHash('sha256');
  const src = readFileSync(join(root, 'scripts', 'sw.js'), 'utf8');
  hash.update(src);
  for (const path of [...new Set(Object.values(lists).flat())].sort()) {
    hash.update(path);
    hash.update(readFileSync(join(out, path.endsWith('/') || path === '' ? path + 'index.html' : path)));
  }
  const sw = src.replace("const VERSION = '__VERSION__';", `const VERSION = '${hash.digest('hex').slice(0, 12)}';`)
    .replace('const LISTS = __PRECACHE__;', `const LISTS = ${JSON.stringify(lists)};`);
  if (sw.includes("'__VERSION__'") || sw.includes('= __PRECACHE__')) throw new Error('scripts/sw.js: placeholders not filled');
  writeFileSync(join(out, 'sw.js'), sw);
}

if (arg('--fragment')) writeFileSync(arg('--fragment'), fragment);
console.log('built', out, built.map(b => (b.lang.dir ? b.lang.dir + '/' : '') + b.slug).join(' '), targetName ? `(${targetName})` : '');
