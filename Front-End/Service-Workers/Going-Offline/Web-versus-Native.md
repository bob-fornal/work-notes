# Web versus Native

| Web               | Native                 |
|-------------------|------------------------|
| Online by default | Offline by default     |
| Discoverable      | App Store Installation |
| ... No Store      | ... Horrible           |

* Performance
* Fallbacks
* Progressive Enhancement

Needs ...

1. Base Experience
2. Background Sync
3. Push Notifications

Activate Event ...

(Clean up on activation)

```javascript
event.waitUntil(
  caches.keys().then((names) => {
    return Promise.all(
      names.filter((name) => {
        return name !== cacheName;
      }).map((name) => {
        return caches.delete(name);
      });
    );
  });
);
```

```javascript
// tell Service Worker to self.skipWaiting();
navigator.serviceWorker.register('/sw.js')
.then((reg) => {
  reg.addEventListener('updatefound', () => {
    let worker = reg.installing;
    reg.installing.addEventListener('statechange', (e) => {
      if (worker.state === 'installed') {
        worker.postMessage({ action: 'update' });
      }
    });
  });
});

let sw = navigator.serviceWorker;
sw.addEventListener('controllerchange', () => {
  window.location.reload();
});
```