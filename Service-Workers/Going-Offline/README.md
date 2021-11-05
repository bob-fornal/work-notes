# Service Workers

> Windows 3.1; successfully booting up was an event worthy of fanfare.

Service Workers control the network.

Scripts that intercept **network** requests so that web developers can treat the network as an **enhancement** and provice **offline** experiences for users of web applications.

```javascript
if (navigator.hasOwnProperty('serviceWorker')) {
  navigator.serviceWorker.register('...');
}
```

## Handling

* No Connectivity
* Limited Connectivity (weak signal)

Why wait for a connection to fail to see something that is already on their phone.

Get cache first, then network.

## Notes

Promise-Based

```javascript
  .then(success, failure);
```

Event-Based

(Simplest Pattern)

**Install Event** ...

```javascript
/// Stores Information
event.waitUntil(
  caches.open(name).then((cache) => {
    return cache.addAll([
      "/index.html",
      "/app.css"
    ]);
  });
);
```

**Fetch Event** ...

```javascript
// Retrieves Information
event.respondsWith(
  caches.open(name).then((cache) => {
    return cache.match(event.request);
  });
);
```

## Notes

* [Web versus Native](Web-versus-Native.md)
* [Offline Pages](Offline-Pages.md)
