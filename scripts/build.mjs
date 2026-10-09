// Builds the site served at anoni.net/mystery into dist/mystery/.
// Usage: [CASE_KEY=<culprit name>] node scripts/build.mjs [--fragment <file>]
//   --fragment also writes the page without the <html>/<head> wrapper (for previews
//   that supply their own document skeleton).
// The interactive page needs no key: the encrypted solution is embedded as is.
// The static version (static/) is built only when CASE_KEY is set, because its ending
// page is plain HTML. Deployments should always set it.
import { readFileSync, writeFileSync, mkdirSync, cpSync, statSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decryptB64 } from './crypt.mjs';
import { buildStatic } from './static.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const caseDir = join(root, 'cases', '01-night-heron');
const web = join(caseDir, 'web');
const out = join(root, 'dist', 'mystery');

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

const cut = page.indexOf('</style>') + '</style>'.length;
const doc = `<!doctype html>
<html lang="zh-Hant-TW">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="referrer" content="no-referrer">
<meta name="description" content="隱私推理遊戲：從一張照片的中繼資料、背景與文字習慣，找出不小心暴露身分的吹哨者。">
${page.slice(0, cut).trim()}
</head>
<body>
${page.slice(cut).trim()}
</body>
</html>
`;

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'index.html'), doc);
cpSync(join(web, 'assets'), join(out, 'assets'), { recursive: true });

const key = (process.env.CASE_KEY || '').trim();
if (key) {
  const pages = buildStatic({
    caseDir, out,
    sitesCss: readFileSync(join(web, 'sites.css'), 'utf8'),
    solution: decryptB64(blob, key),
    pxlSize: kb(join(web, 'assets', 'PXL_20260914_144712345.jpg')),
    socialSizes: social,
  });
  console.log(`built static version: ${pages} pages`);
} else {
  console.warn('CASE_KEY not set: skipped the static version (the interactive page links to static/).');
}

const i = process.argv.indexOf('--fragment');
if (i > 0 && process.argv[i + 1]) writeFileSync(process.argv[i + 1], page);
console.log('built', join('dist', 'mystery'));
