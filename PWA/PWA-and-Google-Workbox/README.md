# PWA and Google's Workbox

Vanilla JavaScript

Install `package.json` ...
```script
$ npm init -y
$ npm -i http-server -g
```

```json
"scripts": {
  "serve": "http-server -p 1336 build -c-1"
}
```

```javascript
const ul = document.getElementById('people');

function createNode(element) {
  return document.createElement(element);
}

function append(parent, element) {
  return parent.appendChild(element);
}

fetch('url')
  .then(response => response.json())
  .then(data => {
    let people = data;
    return people.map(function(person) {
      let li = createNote('li');
      let span = createNode('span');
      li.innerHTML = person.name;
      span.innerHTML = person.email;
      append(li, span);
      append(ul, li);
    });
  });
```

```script
$ npm install workbox-cli -g
$ workbox wizard
...
$ workbox generate sw
```

```html
<script>
  if (navigator.hasOwnProperty('serviceWorker')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
</script>
```

## src-sw.js

```javascript
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

// Custom Adjustments ...
workbox.routing.registerRoute(new RegExp('url'), weokbox.strategies.cacheFirst());
workbox.precaching.precacheAndRoute([]);
```

## Manifest JSON Generator

```html
<link rel="manifest" href="manifest.json" />
```
