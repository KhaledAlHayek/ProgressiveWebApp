const staticCacheName = "site-static-v7";
const dynamicCache = "site-dynamic-v1";

const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/main.js",
  "/css/main.css",
  "/img/dish.png",
  "/pages/fallback.html",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v125/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
];

const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size))
      }
    });
  });
}

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        cache.addAll(assets)
      })
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => { // return name of caches [array] 
      return Promise.all(
        keys.filter(key => key !== staticCacheName && key !== dynamicCache).map(key => caches.delete(key))
      );
    })
  ); // extend life of activate event
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
    .then(cacheRes => {
      return cacheRes || fetch(e.request).then(fetchRes => {
        caches.open(dynamicCache).then(cache => {
          cache.put(e.request.url, fetchRes.clone());
          limitCacheSize(dynamicCache, 20);
          return fetchRes;
        });
      }); // while online, the users has the oppertunity to cache some pages and view them offline.
    }).catch(() => {
      if(e.request.url.indexOf(".html") > -1){
        return caches.match("/pages/fallback.html");
      }
    })
  );
});