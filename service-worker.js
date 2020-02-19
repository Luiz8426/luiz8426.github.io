const cacheName = "v1";
const cacheOfflineURL = "index.html";
const cacheAssets = [
  "index.html",
  "styles.css",
  "curriculo.pdf",
  "/image/aigree_logo.png",
  "/image/fidelizapp_logo.png",
  "/image/spot_logo.jpg",
  "/image/pingui_logo.png"
];
// Call Install Event
self.addEventListener("install", e => {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        cache.addAll(cacheAssets);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

// Call activate Event
self.addEventListener("activate", e => {
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Call fetch Event
self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(cacheOfflineURL)));
});
