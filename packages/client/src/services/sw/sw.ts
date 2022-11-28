/// <reference path="./common.d.ts"  />

const CHECK_ONLINE_STATUS_PARAM: TCheckOnlineParam = 'check-online';

const VERSION = '0.0.45';
console.info(`[SW]: VERSION ${VERSION}`);

const CACHE_NAME = 'chicago-app-v-' + VERSION;

const INDEX_HTML_PATH = 'index.html';

const cacheFiles = [INDEX_HTML_PATH];

const SW = self;

SW.addEventListener('install', event => {
  console.log('[SW]: install');

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(cacheFiles);
    })
  );
});

SW.addEventListener('activate', event => {
  console.log('[SW]: activate');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

SW.addEventListener('fetch', event => {
  const url = new URL(event.request.clone().url);

  const isCheckOnlineParam = url.searchParams.get(CHECK_ONLINE_STATUS_PARAM);

  if (isCheckOnlineParam) {
    event.respondWith(fetch(event.request));
  } else {
    event.respondWith(networkFirst(event.request, 10000).catch(() => fromCache(event.request)));
    event.waitUntil(update(event.request));
  }
});

const update = request =>
  caches.open(CACHE_NAME).then(cache => fetch(request).then(response => cache.put(request, response)));

const fromCache = request =>
  caches
    .open(CACHE_NAME)
    .then(cache => cache.match(request).then(matching => matching || cache.match(INDEX_HTML_PATH)));

const networkFirst = (request: Request, timeout: number) =>
  new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    fetch(request).then(response => {
      clearTimeout(timeoutId);
      fulfill(response);
      update(request);
    }, reject);
  });
