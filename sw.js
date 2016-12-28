this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/test_service_worker/',
        '/test_service_worker/index.html',
        '/test_service_worker/style.css',
        '/test_service_worker/app.js',
        '/test_service_worker/image-list.js',
        '/test_service_worker/star-wars-logo.jpg',
        '/test_service_worker/gallery/bountyHunters.jpg',
        '/test_service_worker/gallery/myLittleVader.jpg',
        '/test_service_worker/gallery/snowTroopers.jpg'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(r) {
    response = r;
    caches.open('v1').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('/test_service_worker/gallery/myLittleVader.jpg');
  }));
});
