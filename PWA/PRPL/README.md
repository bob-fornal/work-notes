# PRPL

> The mobile web is no longer just a subset of the web ... it's just simply the web.

Mobile traffic is outpacing desktop traffic.

Only load what you need for the current view.

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

## Average Mobile User

* 1GB or less of RAM.
* Average Load Time: 19 seconds.
* 53% of sites are **abandoned** if a mobile site takes more than three (3) seconds to load.
* 1 out of 2 people **expect** a page to load in less than two (2) seconds.

It's a Mobile World

* Test on real devices on mobile networks.

Optimize Network Utilization

* Service Workers, preload, and push for fast initial loading ...

JavaScript Parse has cost ...

* Ship the smallest amount of JavaScript possible. 

### To Load a Page

* Phase 1: Request the page (server processing and round-trip time).
* Phase 2: Receive and Request (parsong HTML and requesting critical assets).
* Phase 3: Parse and Render (parse and execute page critical assets to render).

## Measuring and Optimizing

### Network Delivery

(without Service Worker)

* Baseline: no bundling, HTTP/2, simulated 3G network (5500ms).
* 1: link rel="preload" (handle "late discovery" documents) (3300ms).
* 2: H2 Server Push (not cache aware, no resource prioritization) (1700ms)

### JavaScript Exeuction and Parse

Average JavaScript on every page load ...

* Nov 2010: 113k
* Oct 2016: 408k

