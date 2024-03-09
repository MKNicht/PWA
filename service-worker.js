var cacheName = "Lessons-v1";
var cacheFiles = [
    "index.html",
    "styles.css",
    "script.js",
    "image/art.png",
    "image/biology.png",
    "image/chemistry.png",
    "image/chinese.png",
    "image/computer science.png",
    "image/english.png",
    "image/geography.png",
    "image/icon-128x128.png",
    "image/icon-192x192.png",
    "image/icon-512x512.png",
    "image/math.png",
    "image/music.png",
    "image/physics.png"
];

self.addEventListener("install", function(e) {
    console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log("[Service Worker] Caching files");
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request).then(function(response) {
                let responseClone = response.clone();
                caches.open(cacheName).then(function(cache) {
                    cache.put(e.request, responseClone);
                });
                return response;
            });
        })
    );
});