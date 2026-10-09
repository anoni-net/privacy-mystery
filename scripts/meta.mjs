// Icon and social preview tags shared by the lobby, the interactive page and the static pages.
// The icons live at the top of the site (copied from site/), so each page passes the relative
// path back up to it. Preview images need absolute URLs; the onion build rewrites them to the
// onion address along with every other link to anoni.net/mystery/.
export const SITE = 'https://anoni.net/mystery/';

const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Icons, plus what installing the site as an app needs: the language's web app manifest
// (site/manifest.webmanifest, site/en/manifest.webmanifest) and the status bar colour.
export function iconTags(toRoot, lang = 'zh', theme = '#11161d') {
  return `<link rel="icon" href="${toRoot}favicon.svg" type="image/svg+xml">
<link rel="icon" href="${toRoot}favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${toRoot}apple-touch-icon.png">
<link rel="manifest" href="${toRoot}${lang === 'zh' ? '' : lang + '/'}manifest.webmanifest">
<meta name="theme-color" content="${theme}">
<meta name="apple-mobile-web-app-title" content="${lang === 'zh' ? '隱私推理' : 'Mysteries'}">`;
}

// Registers the service worker (scripts/sw.js, built to the top of the site) and asks it to
// keep this language's pages for offline play. Only on anoni.net and local previews: Tor
// Browser turns service workers off, and other hosts may serve the site under another path.
export function swScript(toRoot, lang = 'zh') {
  return `if ('serviceWorker' in navigator && /^(anoni\\.net|localhost|127\\.0\\.0\\.1)$/.test(location.hostname)) {
  navigator.serviceWorker.register('${toRoot}sw.js', { scope: '${toRoot || './'}' })
    .then(function () { return navigator.serviceWorker.ready; })
    .then(function (r) { if (r.active) r.active.postMessage({ type: 'precache', lang: '${lang === 'zh' ? '' : lang + '/'}' }); })
    .catch(function () {});
}`;
}

// path and image are relative to the top of the site, e.g. 'en/night-heron/' and 'en/night-heron/og.png'
export function ogTags({ lang, siteName, title, desc, path, image, alt }) {
  return `<meta property="og:type" content="website">
<meta property="og:site_name" content="${attr(siteName)}">
<meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'zh_TW'}">
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
export const SITE_NAME = { zh: 'anoni.net 隱私推理遊戲', en: 'anoni.net privacy mysteries' };
