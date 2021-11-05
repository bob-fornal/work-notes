# Progressive Web Applications (PWAs)

**PRPL**: Only load what you need for the current view.

* Prefetch
* Preload `<link rel=preload>`
* Proper image size
* Limited Data Mode
* Prevent unnecessary updates

## PRPL Pattern

1. PUSH critical resources for the initial route.
2. RENDER initial route and get it interactive ASAP.
3. PRE-CACHE remaining routes using Service Worker.
4. LAZY-LOAD and instantiate remaining routes on-demand.

