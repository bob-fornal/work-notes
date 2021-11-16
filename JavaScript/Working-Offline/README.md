# Working Offline

## Sensing Online versus Offline

```javascript
let online = navigator.onLine;

window.addEventListener('online', () => {
  this.set('online', true);
});
window.addEventListener('offline', () => {
  this.set('online', false);
});
```

## Sensing Network Speed

```javascript
if (navigator.hasOwnProperty('connection')) {
  this.updateSpeedIcon(navigator.connection); // SEE *
  navigator.connection.addEventListener('change', (event) => {
    this.updateSpeedIcon(event.target);
  });
}

// *
{
  type: 'wifi' || 'cellular' || 'bluetooth' || ...,
  downLinkMax: '10', // Mbps
  rtt: '250', // ms
  effectiveType: 'slow-2g' || '2g' || '3g' || '4g'
}
```
