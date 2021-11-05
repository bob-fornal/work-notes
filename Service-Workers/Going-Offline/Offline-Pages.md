# Offline Pages

Data versus files ...

IndexedDB (shock and horror)

* IndexedDB Promises
* LocalStorage
* Dexie
* PouchDB

```javascript
var db = new Dexie('messageStore', {
  autoOpen: true
});

db.version(1).stores({
  messages: '++, createdAt'
});

db.transaction('w', db.messages, () => {
  db.messages.put({
    from: FROM_NUMBER,
    to: TO_NUMBER,
    createAt: new Date(),
    body: 'Service Workers Rock'
  }).then((message) => {
    console.log(...);
  });
});

db.transaction('r', db.messages, () => {
  db.messages.each((item, cursor) => {
    render(item);
  });
});
```

## Thinking Offline

Permissions ... Push Notifications

Push Event ...

```javascript
event.waitUntil(
  self.registration.showNotification('Title', {
    body: 'Hello there ...'
  });
);
```
**NOTE**: Settings to Allow / Block ...

* Base experience
* Static assets
* Offline pages
* Background sync
* Push notifications
