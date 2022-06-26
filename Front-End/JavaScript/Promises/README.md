# Promise Examples

## Notes

### Promise.all()

The `Promise.all()` method takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises.

This returned promise will resolve when:

* All of the input's promises have resolved, or if the input iterable contains no promises.
* It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error.

This method can be useful for aggregating the results of multiple promises. It is typically used when there are multiple related asynchronous tasks that the overall code relies on to work successfully — all of whom we want to fulfill before the code execution continues.

`Promise.all()` will reject immediately upon any of the input promises rejecting. In comparison, the promise returned by `Promise.allSettled()` will wait for all input promises to complete, regardless of whether or not one rejects. Consequently, it will always return the final result of every promise and function from the input iterable.

* If the iterable contains non-promise values, they will be ignored, but still counted in the returned promise array value (if the promise is fulfilled):

### Promise.allSettled()

The `Promise.allSettled()` method returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

It is typically used when you have multiple asynchronous tasks that are not dependent on one another to complete successfully, or you'd always like to know the result of each promise.

### Promise.any()

The `Promise.any()` method takes an iterable of promises as an input. It returns a single promise that resolves as soon as any of the promises in the iterable fulfills, with the value of the fulfilled promise. If no promises in the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected with an `AggregateError`, a new subclass of `Error` that groups together individual errors.

Unlike `Promise.all()`, which returns an array of fulfillment values, we only get one fulfillment value (assuming at least one promise fulfills). This can be beneficial if we need only one promise to fulfill but we do not care which one does. Note another difference: This method rejects upon receiving an empty iterable, since, truthfully, the iterable contains no items that fulfill.

Also, unlike `Promise.race()`, which returns the first settled value (either fulfillment or rejection), this method returns the first fulfilled value. This method will ignore all rejected promises up until the first promise that fulfills.

### Promise.race()

The `Promise.race()` method takes an interable of promises as an input, and returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.
