# Functional Code

```javascript
if (navigator.hasOwnProperty('serviceWorker')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then(req => {})
      .catch(error => console.log(error));
  });
}

const cachename = 'v1'; // 'v2'

const cacheassets = [
  'index.html',
  'about.html',
  'css/style.css',
  'js/main.js'
];

// call install event
self.addEventListener('install', (e) => {
  console.log('SW installed');
  e.waitUntil(
    caches.open(cachename)
      .then(cache => {
        console.log('SW caching files');
        cache.addAll(cacheassets);
      })
      .then(() => {
        self.skipWaiting();
      });
  );
});

// call activate event
self.addEventListener('activate', (e) => {
  console.log('SW activated');
  // remove unwanted caches
  e.waitUntil(
    cache.keys().then(cachenames => {
      return Promise.all(
        cachenames.map(cache => {
          if (cache !== cachename) {
            console.log('SW clearing old cache');
            return caches.delete(cache);
          }
        });
      );
    });
  );
});

// call fetch event
self.addEventListener('fetch', (e) => {
  console.log('SW fetching');
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // copy clone of response
        const resClone = res.clone();
        cache.open(cachename)
          .then(cache => {
            cache.put(e.request, resClone);
          });
        return res;
      })
      .catch(() => caches.match(e.request).then(res => res));
  );
});
```
