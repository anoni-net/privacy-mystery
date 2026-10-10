/* Service worker for anoni.net/mystery, so the game can be installed as an app and played
 * offline. scripts/build.mjs fills in __VERSION__ and __PRECACHE__ and writes it to the top of
 * the site as sw.js (scope /mystery/).
 *
 * What it keeps on the device: the lobby, the interactive pages and their images, for the
 * language the player uses (about 1 MB each). Not the static edition, which is for browsers
 * without JavaScript and so never has a service worker, and not the PDFs, which are downloads.
 * Saved progress stays in localStorage as before; this only stores the site's public files.
 *
 * - Pages: network first, asking the server every time (cache: no-cache) so a new release
 *   shows up at once. Offline, the stored copy, or the lobby when the page was never stored.
 * - Other files on this site: stored copy first, refreshed in the background.
 * - Other sites (the analytics script) and PDFs pass straight through.
 *
 * A page posts {type: 'precache', lang: '' | 'en/'} once the worker is ready, and the worker
 * stores that language's list. A new release takes over right away: pages are fetched from the
 * network first anyway, and a game already open keeps running from memory. */
const VERSION = '__VERSION__';
const PRECACHE = 'mystery-precache-' + VERSION;
const RUNTIME = 'mystery-runtime';
const RUNTIME_MAX = 120;
// { '': [paths], 'en/': [paths] }, relative to the scope
const LISTS = __PRECACHE__;
const SCOPE = new URL(self.registration.scope).pathname;

self.addEventListener('install', event => {
  self.skipWaiting();
  // Carry over the languages the previous release had stored, so an update never leaves an
  // installed app without its offline copy
  event.waitUntil((async () => {
    for (const name of await caches.keys()) {
      if (!name.startsWith('mystery-precache-') || name === PRECACHE) continue;
      const old = await caches.open(name);
      for (const lang of Object.keys(LISTS)) {
        if (await old.match(SCOPE + lang)) await precache(lang).catch(() => {});
      }
    }
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) {
      if (name.startsWith('mystery-precache-') && name !== PRECACHE) await caches.delete(name);
    }
    await self.clients.claim();
  })());
});

async function precache(lang) {
  const list = LISTS[lang];
  if (!list) return;
  const cache = await caches.open(PRECACHE);
  await Promise.all(list.map(async path => {
    const url = SCOPE + path;
    if (await cache.match(url)) return;
    const response = await fetch(url, { credentials: 'same-origin', cache: 'no-cache' });
    if (response.ok) await cache.put(url, response);
  }));
}

self.addEventListener('message', event => {
  const data = event.data || {};
  if (data.type === 'precache' && typeof data.lang === 'string') event.waitUntil(precache(data.lang).catch(() => {}));
});

async function trim(cache) {
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - RUNTIME_MAX; i++) await cache.delete(keys[i]);
}

async function fromCache(request) {
  return (await caches.match(request, { ignoreSearch: true })) || undefined;
}

async function page(request) {
  try {
    const response = await fetch(request, { cache: 'no-cache' });
    if (response.ok) {
      const cache = await caches.open(RUNTIME);
      await cache.put(request.url.split('#')[0], response.clone());
      trim(cache);
    }
    return response;
  } catch (err) {
    const stored = await fromCache(request);
    if (stored) return stored;
    // Never stored: go to the lobby in the page's language, or the Chinese one. A redirect
    // rather than the lobby's HTML at this address, so the lobby's relative links still work.
    const lang = new URL(request.url).pathname.slice(SCOPE.length).startsWith('en/') ? 'en/' : '';
    for (const lobby of [SCOPE + lang, SCOPE]) {
      if (lobby !== new URL(request.url).pathname && await caches.match(lobby)) return Response.redirect(lobby, 302);
    }
    return Response.error();
  }
}

async function file(request, event) {
  const stored = await fromCache(request);
  const refresh = fetch(request).then(async response => {
    if (response.ok && response.status === 200) {
      const cache = await caches.open(RUNTIME);
      await cache.put(request, response.clone());
      trim(cache);
    }
    return response;
  });
  if (stored) {
    event.waitUntil(refresh.catch(() => {}));
    return stored;
  }
  return refresh;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin || !url.pathname.startsWith(SCOPE)) return;
  if (url.pathname.endsWith('.pdf') || request.headers.has('range')) return;
  event.respondWith(request.mode === 'navigate' ? page(request) : file(request, event));
});
