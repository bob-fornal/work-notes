# Event-Loop

The JavaScript Language is ...

* Single-Threaded
* Non-Blocking
* Asynchronous
* Concurrent

... it has ...

* A CallStack / Heap
* An Event-Loop
* A Callback Queue
* Other Available APIs

## Web APIs

* DOM
* Ajax
* setTimeout

## The Callstack

One Thread === one callstack === one thing at a time ...

## Concurrency plus Event-Loop

One thing at a time, but not really ...

```javascript
const multiply = (a, b) => a * b;
const square = (n) => multiply(n, n);
const printSquare = (n) => {
  const squared = square(n);
  console.log(squared);
};
printSquare(5);
```

| Stack          |
|----------------|
| multiply(n,n)  |
| square(n)      |
| printSquare(n) |

## Render Queue

* Waits for CallStack to be clear
* But, higher priority than Callback Queue ...