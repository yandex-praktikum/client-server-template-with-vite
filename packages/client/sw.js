const CACHE_NAME = 'my-site-cache-1';
const URLS = [
  '/',
]

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.ts", { scope: "./" }).then(registration => {
      console.log("ServiceWorker registration successful with scope: ", registration.scope);
    }).catch((error) => {
      console.log("ServiceWorker registration failed: ", error);
    });
  });
}

self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(URLS);
    })(),
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      // console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(CACHE_NAME);
      // console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })(),
  );
});
