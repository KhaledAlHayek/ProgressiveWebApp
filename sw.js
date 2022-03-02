// const limitCacheSize = (name, size) => {
//   caches.open(name).then(cache => {
//     cache.keys().then(keys => {
//       if(keys.length > size){
//         cache.delete(keys[0]).then(limitCacheSize(name, size))
//       }
//     });
//   });
// }

const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1"; // while users are online, they got a chance to cache every page they visit, so that it will be available online

const assets = [
  "/",
  "/index.html",
  "/css/main.css",
  "/img/dish.png",
  "/js/app.js",
  "/js/main.js",
  "/pages/fallback.html",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v125/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      cache.addAll(assets);
    }).catch(err => console.log(err))
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== staticCacheName && key !== dynamicCacheName).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
    .then(cacheRes => {
      return cacheRes || fetch(e.request).then(fetchRes => {
        caches.open(dynamicCacheName).then(cache => {
          cache.put(e.request.url, fetchRes.clone());
          return fetchRes;
        });
      });
    }).catch(() => {
      if(e.request.url.indexOf(".html") > -1){
        return caches.match("/pages/fallback.html");
      }
    })
  );
});