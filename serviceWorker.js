const myApp = "BusinessAppV1"; //name of cache
const assets = [
  "./",
  "./sass/main.css",
  "./images/icons"
];
//self mean the service worker itself
self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(myApp).then((cache) => {
      cache.addAll(assets);
    })
  );
});

//fetch data in cach if it's exist then use it if it's not fetch from the network
self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
