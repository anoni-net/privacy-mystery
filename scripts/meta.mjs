// Icon and social preview tags shared by the lobby, the interactive page and the static pages.
// The icons live at the top of the site (copied from site/), so each page passes the relative
// path back up to it. Preview images need absolute URLs; the onion build rewrites them to the
// onion address along with every other link to anoni.net/mystery/.
export const SITE = 'https://anoni.net/mystery/';

const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function iconTags(toRoot) {
  return `<link rel="icon" href="${toRoot}favicon.svg" type="image/svg+xml">
<link rel="icon" href="${toRoot}favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${toRoot}apple-touch-icon.png">`;
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
