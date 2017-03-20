var CACHE_NAME = 'montaner-V1';
// Files required to make this app work offline
var REQUIRED_FILES = [
    "https://montaner-puget.github.io/vins/index.html",
    "https://montaner-puget.github.io/vins/css/jquery.mobile-1.4.5.css",
    "https://montaner-puget.github.io/vins/css/style.css",
    "https://montaner-puget.github.io/vins/js/jquery.js",
    "https://montaner-puget.github.io/vins/js/xls.core.min.js",
    "https://montaner-puget.github.io/vins/js/alasql.min.js",
    "https://montaner-puget.github.io/vins/js/jquery.preload.min.js",
    "https://montaner-puget.github.io/vins/js/jquery.mobile-1.4.5.min.js",
    "https://montaner-puget.github.io/vins/js/jquery.tablesorter.min.js",
    "https://montaner-puget.github.io/vins/js/index.js",
    "https://montaner-puget.github.io/vins/js/loader.js",
    "https://montaner-puget.github.io/vins/js/indexeddb.js",
    "https://montaner-puget.github.io/vins/js/fonctions.carte.js",
    "https://montaner-puget.github.io/vins/images/home.png",
    "https://montaner-puget.github.io/vins/images/vignoble.jpg",
    "https://montaner-puget.github.io/vins/images/verres-vins.jpg",
    "https://montaner-puget.github.io/vins/images/sprites.gif",
    "https://montaner-puget.github.io/vins/images/cepage.jpg",
    "https://montaner-puget.github.io/vins/images/fond-accueil.jpg",
    "https://montaner-puget.github.io/vins/icones/doc.png",
    "https://montaner-puget.github.io/vins/icones/desc.gif",
    "https://montaner-puget.github.io/vins/icones/bg.gif"]

self.addEventListener('install', function (event) {
    console.log('[install]');
    // Perform install step: loading each required file into cache
    event.waitUntil(
            caches.open(CACHE_NAME)
            .then(function (cache) {
                // Add all offline dependencies to the cache
                console.log('[install] Caches opened, adding all core components ' +
                        'to cache');
                return cache.addAll(REQUIRED_FILES);
            })
            .then(function () {
                console.log('[install] All required resources have been cached, ' +
                        'we\'re good!');
                return self.skipWaiting(); // Waiting for client event
            })
            );
});
self.addEventListener('fetch', function (event) {
    event.respondWith(fromCache(event.request));
    event.waitUntil(update(event.request));
});

self.addEventListener('activate', function (event) {
    console.log('[activate] Activating ServiceWorker!');
    // Calling claim() to force a “controllerchange” event on navigator.serviceWorker
    console.log('[activate] Claiming this ServiceWorker!');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('message', function(event) {
    var data = event.data;
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
    if(REQUIRED_FILES.indexOf(url) === -1){
        REQUIRED_FILES.push(url);
    }
}