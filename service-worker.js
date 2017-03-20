var CACHE_NAME = 'montaner-V3';
var data = [];

self.addEventListener('install', function (event) {
    console.log('[install]');
    // Perform install step: loading each required file into cache
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', function (event) {
    event.respondWith(fromCache(event.request));
    event.waitUntil(update(event.request));
});

self.addEventListener('activate', function (event) {
    console.log('[activate] Activating ServiceWorker!');
    // Calling claim() to force a “controllerchange” event on navigator.serviceWorker
    console.log('[activate] Claiming this ServiceWorker!');
    event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (CACHE_NAME.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
    event.waitUntil(self.clients.claim());
});

self.addEventListener('message', function(event) {
    data = event.data;
    console.log(data);
    caches.open(CACHE_NAME)
            .then(function (cache) {
                // Add all offline dependencies to the cache
                console.log('[install] Caches data object message');
                return cache.addAll(data);
            })
});


function fromCache(request) {
    return caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}

function update(request) {
    return caches.open(CACHE_NAME).then(function (cache) {
        return fetch(request).then(function (response) {
          updateRequiredFiles(response.url);
          return cache.put(request, response);
        });
  });
}

function updateRequiredFiles(url) {
    if(data.indexOf(url) === -1){
        data.push(url);
    }
}