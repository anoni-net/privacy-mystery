// Builds the site served at anoni.net/mystery into dist/mystery/: the lobby at the top,
// and each case under its slug (cases/*/case.json), e.g. dist/mystery/night-heron/.
// English lives under en/ (dist/mystery/en/, dist/mystery/en/night-heron/) and is built
// when the case has its English files (case.en.js, web/ui.en.js, solution.en.enc).
// Usage: [CASE_KEY=<culprit name>] node scripts/build.mjs [--target clearnet|onion] [--out <dir>] [--fragment <file>]
//   --target clearnet adds anoni.net's self-hosted Umami to the interactive page
//   (scripts/analytics.html). --target onion rewrites links to anoni.net into the onion
//   addresses and loads no analytics. Without --target the build has neither, which is
//   what local previews and other hosts want.
//   --out writes somewhere other than dist/mystery/.
//   --fragment also writes the Chinese page without the <html>/<head> wrapper (for previews
//   that supply their own document skeleton).
// The interactive page needs no key: the encrypted solution is embedded as is.
// The static version (static/) and the PDF are built only when CASE_KEY is set, because
// their endings are plain text. Deployments should always set it. Every language's
// solution is encrypted with the same key (the culprit's Chinese name).
import { readFileSync, writeFileSync, mkdirSync, cpSync, statSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { decryptB64 } from './crypt.mjs';
import { buildStatic } from './static.mjs';
import { buildPdf } from './pdf.mjs';
import { buildLobby } from './lobby.mjs';
import { iconTags, ogTags, swScript, SITE_NAME } from './meta.mjs';
import { createHash } from 'node:crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const caseDir = join(root, 'cases', '01-night-heron');
// Every case folder with a case.json shows up in the lobby. This script builds case 01;
// generalise the per-case build when a second case exists.
const cases = readdirSync(join(root, 'cases')).sort()
  .filter(d => existsSync(join(root, 'cases', d, 'case.json')))
  .map(d => JSON.parse(readFileSync(join(root, 'cases', d, 'case.json'), 'utf8')));
const manifest = JSON.parse(readFileSync(join(caseDir, 'case.json'), 'utf8'));
const web = join(caseDir, 'web');
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
      ['https://anoni.net/', `http://${ONION}/`],
    ],
  },
};
const targetName = arg('--target');
if (targetName && !TARGETS[targetName]) { console.error('unknown --target ' + targetName); process.exit(1); }
const target = TARGETS[targetName] || {};

// Chinese at the top of the site; other languages under their code, when their files exist.
const LANGS = [
  { code: 'zh', dir: '', caseFile: 'case.js', ui: 'ui.zh.js', solution: 'solution.enc' },
  { code: 'en', dir: 'en', caseFile: 'case.en.js', ui: 'ui.en.js', solution: 'solution.en.enc' },
].filter(l => [join(caseDir, l.caseFile), join(web, l.ui), join(caseDir, l.solution)].every(existsSync));

const key = (process.env.CASE_KEY || '').trim();
const kb = file => Math.max(1, Math.round(statSync(file).size / 1024)) + ' KB';
const pxlSize = kb(join(web, 'assets', 'PXL_20260914_144712345.jpg'));
const social = Object.fromEntries(readdirSync(join(web, 'assets', 'social'))
  .filter(f => f.endsWith('.jpg')).map(f => [f.slice(0, -4), kb(join(web, 'assets', 'social', f))]));

let analytics = '';
if (target.analytics) {
  analytics = readFileSync(join(root, 'scripts', 'analytics.html'), 'utf8').trim() + '\n';
  for (const [token, value] of Object.entries(target.analytics)) analytics = analytics.split(token).join(value);
}

rmSync(out, { recursive: true, force: true });
// Icons and the lobby's preview images sit at the top of the site (made by scripts/make_og.mjs)
mkdirSync(out, { recursive: true });
cpSync(join(root, 'site'), out, { recursive: true });
let fragment = '';

for (const lang of LANGS) {
  const blob = readFileSync(join(caseDir, lang.solution), 'utf8').trim();
  if (key && decryptB64(blob, key) == null) { console.error(`CASE_KEY does not decrypt ${lang.solution}`); process.exit(1); }
  const uiCode = readFileSync(join(web, lang.ui), 'utf8');
  const UI = vm.runInNewContext(`${uiCode}\n;UI`);

  // {{key}} in the page template takes the interface text for this language (filled before
  // the UI, case and CSS files are inlined, so their own text is never touched)
  let page = readFileSync(join(web, 'index.src.html'), 'utf8')
    .replace(/\{\{(\w+)\}\}/g, (_, k) => {
      if (typeof UI[k] !== 'string') throw new Error(`${lang.ui}: missing text for {{${k}}}`);
      return UI[k];
    })
    .replace('/*__UI__*/', () => uiCode)
    .replace('/*__CASE__*/', () => readFileSync(join(caseDir, lang.caseFile), 'utf8'))
    .replace('/*__SITES_CSS__*/', () => readFileSync(join(web, 'sites.css'), 'utf8'));
  const fill = (token, value) => {
    if (!page.includes(token)) throw new Error('missing placeholder ' + token);
    page = page.split(token).join(value);
  };
  fill('__BLOB__', blob);
  fill('__PXL_SIZE__', pxlSize);
  fill('__SOCIAL_SIZES__', JSON.stringify(social));
  fill('__CASE_SLUG__', manifest.slug);
  fill('/*__SW__*/', swScript(lang.dir ? '../../' : '../', lang.code));
  if (lang.code === 'zh') fragment = page;

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

  const langOut = join(out, lang.dir);
  const caseOut = join(langOut, manifest.slug);
  mkdirSync(caseOut, { recursive: true });
  writeFileSync(join(caseOut, 'index.html'), doc);
  cpSync(join(web, 'assets'), join(caseOut, 'assets'), { recursive: true });
  cpSync(join(caseDir, lang.code === 'zh' ? 'og.png' : `og.${lang.code}.png`), join(caseOut, 'og.png'));
  buildLobby({ out: langOut, cases, analytics, lang: lang.code });

  if (key) {
    const solution = decryptB64(blob, key);
    const pages = buildStatic({
      caseDir, out: caseOut, lang: lang.code,
      sitesCss: readFileSync(join(web, 'sites.css'), 'utf8'),
      solution, pxlSize, socialSizes: social,
    });
    console.log(`built ${lang.code} static version: ${pages} pages`);
    // The print source holds the ending in plain text: keep it outside the served site
    const { pdf, html } = buildPdf({ caseDir, out: caseOut, lang: lang.code, srcDir: join(out, '..', 'pdf-src', lang.code), solution, pxlSize });
    if (pdf) console.log('built', pdf);
    else console.warn(`No Chromium-based browser found (set CHROME_PATH): skipped the ${lang.code} PDF. Print source: ${html}`);
  }
}
if (!key) console.warn('CASE_KEY not set: skipped the static versions and the PDFs (they contain the ending).');

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
  const listFiles = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? listFiles(join(dir, e.name)).map(f => e.name + '/' + f) : [e.name]);
  const shared = ['favicon.svg', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png'];
  const lists = Object.fromEntries(LANGS.map(l => {
    const p = l.dir ? l.dir + '/' : '';
    const caseAssets = listFiles(join(out, l.dir, manifest.slug, 'assets')).map(f => `${p}${manifest.slug}/assets/${f}`);
    return [p, [p, `${p}manifest.webmanifest`, `${p}${manifest.slug}/`, ...caseAssets, ...shared]];
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
console.log('built', out, LANGS.map(l => l.code).join('+'), targetName ? `(${targetName})` : '');
