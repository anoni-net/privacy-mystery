// Draws the site icons and the social preview images with a Chromium-based browser.
// The results are committed, so building the site does not need this script:
//   site/favicon-32.png, site/apple-touch-icon.png   from site/favicon.svg
//   site/og.png, site/og-en.png                      the lobby, Chinese and English
//   cases/<case>/og.png, cases/<case>/og.en.png      each case, Chinese and English
// Usage: node scripts/make_og.mjs [--fonts <dir>]
//   The cards use Noto Sans TC and Public Sans (both SIL OFL). Install them, or pass a folder
//   holding their font files with --fonts. Set CHROME_PATH if the browser is not found.
// Run it again after changing site/favicon.svg, tools/og/og.html or a case's title, hook or
// summary in case.json.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdtempSync, copyFileSync, rmSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { findChrome } from './pdf.mjs';
import { SITE_NAME } from './meta.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = name => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
const chrome = findChrome();
if (!chrome) { console.error('No Chromium-based browser found; set CHROME_PATH'); process.exit(1); }

// Work in a temporary copy of tools/og/, with @font-face rules for --fonts added to the template
const work = mkdtempSync(join(tmpdir(), 'mystery-og-'));
for (const f of readdirSync(join(root, 'tools', 'og'))) copyFileSync(join(root, 'tools', 'og', f), join(work, f));
copyFileSync(join(root, 'site', 'favicon.svg'), join(work, 'favicon.svg'));
let faces = '';
const fontDir = arg('--fonts') && resolve(arg('--fonts'));
if (fontDir) {
  const files = readdirSync(fontDir, { recursive: true }).filter(f => /\.(ttf|otf|woff2?)$/i.test(f));
  for (const f of files) {
    const family = /noto\s*sans\s*tc/i.test(f.replace(/[-_]/g, ' ')) ? 'Noto Sans TC' : /public\s*sans/i.test(f.replace(/[-_]/g, ' ')) ? 'Public Sans' : null;
    if (family) faces += `@font-face { font-family: "${family}"; src: url("${pathToFileURL(join(fontDir, f)).href}"); font-weight: 100 900; }\n`;
  }
}
const tpl = join(work, 'og.html');
writeFileSync(tpl, readFileSync(tpl, 'utf8').replace('/*__FONTS__*/', faces));

const shot = (url, file, w, h, transparent) => {
  const args = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', `--window-size=${w},${h}`, `--screenshot=${file}`];
  if (transparent) args.push('--default-background-color=00000000');
  const r = spawnSync(chrome, [...args, url], { stdio: 'ignore', timeout: 60000 });
  if (r.status !== 0 || !existsSync(file)) { console.error('screenshot failed: ' + file); process.exit(1); }
  console.log('wrote', file.replace(root + '/', ''));
};

// Icons: the tile with transparent corners, and a full square for Apple's home screen,
// which rounds the corners itself. Sizes are in pixels: headless windows have a minimum
// width, so the viewport can be wider than the screenshot.
const iconPage = (name, size, square) => {
  const p = join(work, name);
  writeFileSync(p, `<!doctype html><html><body style="margin:0;background:transparent"><div style="width:${size}px;height:${size}px;overflow:hidden;background:${square ? '#003e57' : 'transparent'}"><img src="favicon.svg" style="display:block;width:${size}px;height:${size}px"></div></body></html>`);
  return pathToFileURL(p).href;
};
shot(iconPage('icon.html', 32, false), join(root, 'site', 'favicon-32.png'), 32, 32, true);
shot(iconPage('touch.html', 180, true), join(root, 'site', 'apple-touch-icon.png'), 180, 180, false);

// Preview cards. The lobby's wording follows its page (scripts/lobby.mjs); each case's comes
// from its case.json.
const card = (data, file) => shot(pathToFileURL(tpl).href + '#' + encodeURIComponent(JSON.stringify(data)), file, 1200, 630, false);
card({ lang: 'zh-Hant', site: SITE_NAME.zh, kicker: '霧港隱私互助站 · 委託板', title: '隱私推理遊戲',
  desc: '每一份委託都是一個案件：從照片、檔案與文字裡找出破綻，學會保護自己和別人的隱私。', url: 'anoni.net/mystery' }, join(root, 'site', 'og.png'));
card({ lang: 'en', site: SITE_NAME.en, kicker: 'Mistport Privacy Aid · case board', title: 'Privacy mysteries',
  desc: 'Each request is a case: find the leaks in photos, files and writing, and learn to protect your own privacy and other people’s.', url: 'anoni.net/mystery/en' }, join(root, 'site', 'og-en.png'));

for (const dir of readdirSync(join(root, 'cases')).sort()) {
  const manifest = join(root, 'cases', dir, 'case.json');
  if (!existsSync(manifest)) continue;
  const c = JSON.parse(readFileSync(manifest, 'utf8'));
  card({ lang: 'zh-Hant', site: SITE_NAME.zh, kicker: `案件 ${c.number}`, title: c.title, hook: c.hook, desc: c.summary, url: `anoni.net/mystery/${c.slug}` },
    join(root, 'cases', dir, 'og.png'));
  const en = c.i18n && c.i18n.en;
  if (en) card({ lang: 'en', site: SITE_NAME.en, kicker: `Case ${c.number}`, title: en.title, hook: en.hook, desc: en.summary, url: `anoni.net/mystery/en/${c.slug}` },
    join(root, 'cases', dir, 'og.en.png'));
}
rmSync(work, { recursive: true, force: true });
