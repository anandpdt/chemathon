const CACHE_NAME = "floodsense-v1";

const urlsToCache = [
  "/",
  "/index.html",

];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener("push", function(event) {

  const data = event.data.json();

  const options = {
    body: data.body,
    icon: "/4.png",
    badge: "/4.png"
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );

});
