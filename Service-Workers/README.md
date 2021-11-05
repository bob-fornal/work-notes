# Service Workers

A JavaScript script that gets registered with the browser.

* Stays registered, even when offline.
* Can load content event with no connection.
* Cannot directly access DOM.
* Programmable network proxy.
* Terminated when not used.
* Uses promises.
* Requires HTTPS unless localhost.

**REFERENCE**: [Functional Code](Functional-Code.md)

## Cache-first Strategy

* Offline
* Online Performance

1. Service Workers have ***both*** costs and benefits.
2. If used recklessly, can make page-loading slower.
3. Optimize navigation requests to minimize costs.
4. Manage cache content.
5. Always respect the user.

## Notes

* [Application to PWA](Application-to-PWA.md)
* [Going Offline](Going-Offline/README.md)
