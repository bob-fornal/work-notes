# Progressive Web Applications (PWAs)

## Notes

* [PRPL](PRPL/README.md)
* [PWA and Google's Workbox](PWA-and-Google-Workbox/README.md)

## Starter

[Starter Video](https://youtube.com/c/academind)

### `manifest.json` (no framework)

```html
<link rel="manifest" href="/manifest.json" />
```

See **Chrome** > **Application Tab** > **Manifest**

```json
{
  "name": "...",
  "short_name": "...",
  "start_url": "/index.html", // or "."
  "display": "standalone", // or "fullscreen", "browser"
  "orientation": "portrait",
  "background_color": "#acc",
  "theme_color": "#5ffae5",
  "icons": [
    { "src": "src/images/icons/app-icon-96x96.png", "sizes": "96x96", "type": "image/png" },
    ...
  ],
  ...
}
```

## Service Worker

(SCOPE)

* Domain / folder at or below.
* Not attached to a particular file.
* Registered via page(s).
* Runs in its own thread.

### `sw.js`

```javascript
self.addEventListener('install', function(event) {
  console.log('sw Installed');
});
self.addEventListener('activate', function(event) {
  console.log('sw Activated');
});
```

## 'install'

(wrap in `event.waitUntil(...)`)

```javascript
caches.open('static').then((cache) => {
  // cache.add('/src/js/app.js');
  // cache.add('/');
  // cache.add('/index.html');
  cache.addAll([
    '/',
    '/index.html',
    '/src/js/app.js',
    '/src/images/pwa.jpg',
    // ... relative or standard urls
  ]);
});
```

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        } else {
          return fetch(event.request);
        }
      });
  );
});
```
