// Icon and social preview tags shared by the lobby, the interactive page and the static pages.
// The icons live at the top of the site (copied from site/), so each page passes the relative
// path back up to it. Preview images need absolute URLs; the onion build rewrites them to the
// onion address along with every other link to anoni.net/mystery/.
export const SITE = 'https://anoni.net/mystery/';

// The site's languages: 正體中文 at the top, the others under their code. name is what a
// language link shows (in that language), tag its lang attribute.
export const LANG_INFO = {
  zh: { dir: '', name: '正體中文', tag: 'zh-Hant-TW', og: 'zh_TW', app: '隱私推理' },
  'zh-cn': { dir: 'zh-cn/', name: '简体中文', tag: 'zh-Hans', og: 'zh_CN', app: '隐私推理' },
  en: { dir: 'en/', name: 'English', tag: 'en', og: 'en_US', app: 'Mysteries' },
};

// Links to the same page in other languages: path(code) is that page's path from the top of
// the site, toRoot the way back up to it from the current page.
export function langLinks(langs, current, toRoot, path, cls = '') {
  return langs.filter(l => l !== current).map(l =>
    `<a${cls ? ` class="${cls}"` : ''} href="${toRoot}${path(l)}" lang="${LANG_INFO[l].tag}">${LANG_INFO[l].name}</a>`);
}

const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Icons, plus what installing the site as an app needs: the language's web app manifest
// (site/manifest.webmanifest, site/<code>/manifest.webmanifest) and the status bar colour.
export function iconTags(toRoot, lang = 'zh', theme = '#11161d') {
  return `<link rel="icon" href="${toRoot}favicon.svg" type="image/svg+xml">
<link rel="icon" href="${toRoot}favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${toRoot}apple-touch-icon.png">
<link rel="manifest" href="${toRoot}${LANG_INFO[lang].dir}manifest.webmanifest">
<meta name="theme-color" content="${theme}">
<meta name="apple-mobile-web-app-title" content="${LANG_INFO[lang].app}">`;
}

// Registers the service worker (scripts/sw.js, built to the top of the site) and asks it to
// keep this language's pages for offline play. Only on anoni.net and local previews: Tor
// Browser turns service workers off, and other hosts may serve the site under another path.
export function swScript(toRoot, lang = 'zh') {
  return `if ('serviceWorker' in navigator && /^(anoni\\.net|localhost|127\\.0\\.0\\.1)$/.test(location.hostname)) {
  navigator.serviceWorker.register('${toRoot}sw.js', { scope: '${toRoot || './'}' })
    .then(function () { return navigator.serviceWorker.ready; })
    .then(function (r) { if (r.active) r.active.postMessage({ type: 'precache', lang: '${LANG_INFO[lang].dir}' }); })
    .catch(function () {});
}`;
}

// path and image are relative to the top of the site, e.g. 'en/night-heron/' and 'en/night-heron/og.png'
export function ogTags({ lang, siteName, title, desc, path, image, alt }) {
  return `<meta property="og:type" content="website">
<meta property="og:site_name" content="${attr(siteName)}">
<meta property="og:locale" content="${LANG_INFO[lang].og}">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(desc)}">
<meta property="og:url" content="${SITE}${path}">
<meta property="og:image" content="${SITE}${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${attr(alt || title)}">
<meta name="twitter:card" content="summary_large_image">`;
}

// The name shown as og:site_name and on the preview images
export const SITE_NAME = { zh: 'anoni.net 隱私推理遊戲', 'zh-cn': 'anoni.net 隐私推理游戏', en: 'anoni.net privacy mysteries' };
