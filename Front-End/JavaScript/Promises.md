# Promises

> A Promise is an object representing the eventual completion or failure of an asynchronous operation. Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.

A Promise object represents the success of failure of an asynchronous operation as well as its resulting value.

Promises are used to avoid getting stuck in callbacks within callbacks. Having a callback within a callback falls in to the realm of recursion, but without the assistance of Promises a developer could easily get stuck in a neverending cycle.

Promises are most useful when the asynchronous operations contain two or more back to back operations (chaining callback).

A Promise has three different states: fulfilled, rejected, and pending.

* Fulfilled is returned when an operation is successfully completed.
* Rejected is when the opertion has failed.
* Pending is when the initial state is returned, neither fulfilled nor rejected.

```javascript
const promise = new Promise((resolve, reject) => {
  isMine = true;
  if (isMine) {
    resolve("This cat is mine");
  } else {
    reject("This cat is not mine");
  }
}

promise
  .then(result => console.log(result))
  .catch(() => console.log('error!');
// This cat is mine
```