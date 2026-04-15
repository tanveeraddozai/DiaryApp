const CACHE_NAME = 'diary-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// 1. Install the service worker and save our files to the cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Intercept network requests and serve cached files if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return the cached version if found, otherwise fetch from the network
        return response || fetch(event.request);
      })
  );
});