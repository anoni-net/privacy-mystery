// Builds the site served at anoni.net/mystery into dist/mystery/: the lobby at the top,
// and each case under its slug (cases/*/case.json), e.g. dist/mystery/night-heron/.
// Usage: [CASE_KEY=<culprit name>] node scripts/build.mjs [--target clearnet|onion] [--out <dir>] [--fragment <file>]
//   --target clearnet adds anoni.net's self-hosted Umami to the interactive page
//   (scripts/analytics.html). --target onion rewrites links to anoni.net into the onion
//   addresses and loads no analytics. Without --target the build has neither, which is
//   what local previews and other hosts want.
//   --out writes somewhere other than dist/mystery/.
//   --fragment also writes the page without the <html>/<head> wrapper (for previews
//   that supply their own document skeleton).
// The interactive page needs no key: the encrypted solution is embedded as is.
// The static version (static/) is built only when CASE_KEY is set, because its ending
// page is plain HTML. Deployments should always set it.
import { readFileSync, writeFileSync, mkdirSync, cpSync, statSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decryptB64 } from './crypt.mjs';
import { buildStatic } from './static.mjs';
import { buildPdf } from './pdf.mjs';
import { buildLobby } from './lobby.mjs';

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

const kb = file => Math.max(1, Math.round(statSync(file).size / 1024)) + ' KB';
const blob = readFileSync(join(caseDir, 'solution.enc'), 'utf8').trim();
if (process.env.CASE_KEY && decryptB64(blob, process.env.CASE_KEY.trim()) == null) {
  console.error('CASE_KEY does not decrypt solution.enc'); process.exit(1);
}
const social = Object.fromEntries(readdirSync(join(web, 'assets', 'social'))
  .filter(f => f.endsWith('.jpg')).map(f => [f.slice(0, -4), kb(join(web, 'assets', 'social', f))]));

let page = readFileSync(join(web, 'index.src.html'), 'utf8')
  .replace('/*__CASE__*/', () => readFileSync(join(caseDir, 'case.js'), 'utf8'))
  .replace('/*__SITES_CSS__*/', () => readFileSync(join(web, 'sites.css'), 'utf8'));
const fill = (token, value) => {
  if (!page.includes(token)) throw new Error('missing placeholder ' + token);
  page = page.split(token).join(value);
};
fill('__BLOB__', blob);
fill('__PXL_SIZE__', kb(join(web, 'assets', 'PXL_20260914_144712345.jpg')));
fill('__SOCIAL_SIZES__', JSON.stringify(social));
fill('__CASE_SLUG__', manifest.slug);

let analytics = '';
if (target.analytics) {
  analytics = readFileSync(join(root, 'scripts', 'analytics.html'), 'utf8').trim() + '\n';
  for (const [token, value] of Object.entries(target.analytics)) analytics = analytics.split(token).join(value);
}

const cut = page.indexOf('</style>') + '</style>'.length;
const doc = `<!doctype html>
<html lang="zh-Hant-TW">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content">
<meta name="referrer" content="no-referrer">
<meta name="description" content="隱私推理遊戲：從一張照片的中繼資料、背景與文字習慣，找出不小心暴露身分的吹哨者。">
${analytics}${page.slice(0, cut).trim()}
</head>
<body>
${page.slice(cut).trim()}
</body>
</html>
`;

const caseOut = join(out, manifest.slug);
rmSync(out, { recursive: true, force: true });
mkdirSync(caseOut, { recursive: true });
writeFileSync(join(caseOut, 'index.html'), doc);
cpSync(join(web, 'assets'), join(caseOut, 'assets'), { recursive: true });
buildLobby({ out, cases, analytics });

const key = (process.env.CASE_KEY || '').trim();
if (key) {
  const pages = buildStatic({
    caseDir, out: caseOut,
    sitesCss: readFileSync(join(web, 'sites.css'), 'utf8'),
    solution: decryptB64(blob, key),
    pxlSize: kb(join(web, 'assets', 'PXL_20260914_144712345.jpg')),
    socialSizes: social,
  });
  console.log(`built static version: ${pages} pages`);
  const { pdf, html } = buildPdf({
    caseDir, out: caseOut, srcDir: join(out, '..', 'pdf-src'),
    solution: decryptB64(blob, key),
    pxlSize: kb(join(web, 'assets', 'PXL_20260914_144712345.jpg')),
  });
  if (pdf) console.log('built', pdf);
  else console.warn(`No Chromium-based browser found (set CHROME_PATH): skipped the PDF. Print source: ${html}`);
} else {
  console.warn('CASE_KEY not set: skipped the static version and the PDF (both contain the ending).');
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

if (arg('--fragment')) writeFileSync(arg('--fragment'), page);
console.log('built', out, targetName ? `(${targetName})` : '');
