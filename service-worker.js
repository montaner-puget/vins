var CACHE_NAME = 'montaner-v1';
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
    "https://montaner-puget.github.io/vins/icones/bg.gif"
]

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
                return self.skipWaiting(); // Attente d'évènement pour mise à jour client actif
            })
            );
});
self.addEventListener('fetch', function (event) {
    event.respondWith(fromCache(event.request)

//        caches.match(event.request).catch(function () {
//            return fetch(event.request).then(function (response) {
//                return caches.open(CACHE_NAME).then(function (cache) {
//                    cache.put(event.request, response.clone());
//                    return response;
//                });
//            });
//        })

            );
    event.waitUntil(update(event.request));
});

self.addEventListener('activate', function (event) {
    console.log('[activate] Activating ServiceWorker!');
    // Calling claim() to force a “controllerchange” event on navigator.serviceWorker
    console.log('[activate] Claiming this ServiceWorker!');
    var cacheWhitelist = ['montaner-v1'];

    event.waitUntil(
        openDb()).then(function(){
        console.log('open db');
            createCheckboxRegion(objVins);
            createCheckboxDomaine(objVins);
            createCheckboxCouleur(objVins);
            addLignesVins(objVins);

            $('#listevins .tablesorter').tablesorter({sortList: [[0, 0]], headers: {2: {sorter: 'digit'}}});

            $("#resultats_recherche").hide();
            $("#search").val("");
            search(objVins);
            showHideLines(objVins);
            createPopup(objVins);
            checkAll(objVins);
        }).then(function(){  
            
        self.clients.claim()}).then(function(){   
            
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(keyList[i]);
                }
            }));
        })
        });
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
            console.dir('url:' + response.url);
            updateRequiredFiles(response.url);
            return cache.put(request, response);
        });
    });
}

function updateRequiredFiles(url) {
    if (REQUIRED_FILES.indexOf(url) === -1) {
        REQUIRED_FILES.push(url);
    }
    console.log(REQUIRED_FILES);
}
