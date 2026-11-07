// FenLab service worker: caches the app after the first visit so it also starts offline.
const CACHE = 'fenlab-v0.15.0';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  // on an upgrade (an older cache exists) reload open tabs once, so nobody keeps seeing the previous version
  e.waitUntil(caches.keys().then(keys => { const old = keys.filter(k => k !== CACHE); return Promise.all(old.map(k => caches.delete(k))).then(() => old.length > 0); }).then(upgraded => self.clients.claim().then(() => upgraded ? self.clients.matchAll({type: 'window'}).then(cs => cs.forEach(c => c.navigate(c.url).catch(() => {}))) : null)));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin) || req.headers.has('range')) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(req);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    } catch (err) {
      const fallback = await cache.match('./index.html');
      if (fallback && req.mode === 'navigate') return fallback;
      throw err;
    }
  }));
});
