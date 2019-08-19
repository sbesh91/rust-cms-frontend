const CACHE_NAME = 'v1';
const version = '1.0.1';

self.addEventListener('install', function (event) {
  console.log('installing service worker');
  self.skipWaiting();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(async function (response) {
      if (response) {
        cacheCheck(event.request);
        return response;
      }

      return await cacheCheck(event.request);
    })
  );
});

async function cacheCheck(request) {
  return fetch(request).then(
    function (response) {
      // Check if we received a valid response
      if (!response || response.status !== 200 || response.url.includes('/api/')) {
        return response;
      }

      // IMPORTANT: Clone the response. A response is a stream
      // and because we want the browser to consume the response
      // as well as the cache consuming the response, we need
      // to clone it so we have two streams.
      var responseToCache = response.clone();
      
      caches.open(CACHE_NAME)
        .then(function (cache) {
          cache.put(request, responseToCache);
        });

      return response;
    }
  ).catch(function (error) {
    console.log('fetch error ', request.url);
  });
}

self.addEventListener('activate', function (event) {
  console.log('claiming service worker');
  event.waitUntil(self.clients.claim());
});