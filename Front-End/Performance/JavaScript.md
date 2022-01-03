# JavaScript

From the DOM API: Navigation Timing API provides data that can be used to measure the performance of a website.

```javascript
const performanceData = window.performance.timing;

const pageLoadTime = performanceData.loadEventEnd - performanceData.nagigationStart;
const renderTime = performanceData.domComplete - performanceData.domLoading;
const connectTime = performanceData.responseEnd - performanceData.requestStart;
```