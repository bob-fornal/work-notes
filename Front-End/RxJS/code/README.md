# RxJS Code Samples

## Simplest Example

* [File HERE (rxjs--001-simple-example.js)](./rxjs--001-simple-example.js)
* Runner: `npm run sample001`

## Using an Observer

* [File HERE (rxjs--002-observer.js)](./rxjs--002-observer.js)
* Runner: `npm run sample002`

The observer is an object with optional keys (`next`, `error`, and `complete`) that provide functionality for the described scenarios. This object is passed into the subscription.

## Basic Observable and Observer

* [File HERE (rxjs--003-Observable-observer.js)](./rxjs--003-Observable-observer.js)
* Runner: `npm run sample003`

>   "If either an Error or Complete notification is delivered,
    then nothing else can be delivered afterwards."
    - RxJS documentation

## Basic Observable and Subscriber

* [File HERE (rxjs--004-Observable-subscriber.js)](./rxjs--004-Observable-subscriber.js)
* Runner: `npm run sample004`

## Subscriber and Unsubscribe

* [File HERE (rxjs--005-subscriber-unsubscribe.js)](./rxjs--005-subscriber-unsubscribe.js)
* Runner: `npm run sample005`

>   "Subscription: represents the execution of an Observable,
    is primarily useful for canceling the execution.""
    — RxJS documentation

## `pipe` Function

* [File HERE (rxjs--006-pipe.js)](./rxjs--006-pipe.js)
* Runner: `npm run sample006`

The `pipe` function that allows you to add RxJS operators to the flow.

## `concat`

* [File HERE (rxjs--007-concat.js)](./rxjs--007-concat.js)
* Runner: `npm run sample007`

`concat` concatenates multiple Observables together by sequentially emitting their values, one Observable after the other.

## `merge`

* [File HERE (rxjs--008-merge.js)](./rxjs--008-merge.js)
* Runner: `npm run sample008`

`merge` flattens multiple Observables together by blending their values into one Observable.

## `forkJoin`

* [File HERE (rxjs--009-forkJoin-object)](./rxjs--009-forkJoin-object.js)
* Runner: `npm run sample009`
* [File HERE (rxjs--010-forkJoin-array)](./rxjs--010-forkJoin-array.js)
* Runner: `npm run sample010`

`forkJoin` waits for Observables to complete and then combine the last values they emitted.

## `fromEvent`

* [File HERE (rxjs--011-fromEvent)](./rxjs--011-fromEvent.js)
* Runner: `npm run sample011`

`fromEvent` creates an Observable from DOM events, NodeJS EventEmitter eventsc or others.

## `iif`

* [File HERE (rxjs--012-iif)](./rxjs--012-iif.js)
* Runner: `npm run sample012`

`iif`: If statement for Observables.

## `defer`

* [File HERE (rxjs--013-defer.js)](./rxjs--013-defer.js)
* Runner: `npm run sample013`

`defer` creates the Observable lazily, that is, only when it is subscribed.

## `partition`

* [File HERE (rxjs--014-partition.js)](./rxjs--014-partition.js)
* Runner: `npm run sample014`

`partition` outputs an array with two Observables that partition the values from the source Observable through the given predicate function.

## `range`

* [File HERE (rxjs--015-range.js)](./rxjs--015-range.js)
* Runner: `npm run sample015`

`range` emits a sequence of numbers in a range.

## `interval`

* [File HERE (rxjs--016-interval.js)](./rxjs--016-interval.js)
* Runner: `npm run sample016`

`interval` emits incremental numbers periodically in time.

## `timer`

* [File HERE (rxjs--017-timer.js)](./rxjs--017-timer.js)
* Runner: `npm run sample017`

`timer` is like `interval`, but you can specify when the emissions should start.

## `bindCallBack`

* [File HERE (rxjs--018-bindCallBack.js)](./rxjs--018-bindCallBack.js)
* Runner: `npm run sample018`

Given a function `f` of type `f(x, callback)` and it will return a function `g` that when called as `g(x)` will output an Observable.

## `bindNodeCallback`

* [File HERE (rxjs--019-bindNodeCallback.js)](./rxjs--019-bindNodeCallback.js)
* Runner: `npm run sample019`

`bindNodeCallback` is just like `bindCallback`, but the callback is expected to be of type `callback(error, result)`.

## `generate`

* [File HERE (rxjs--020-generate.js)](./rxjs--020-generate.js)
* Runner: `npm run sample020`

Use `generate` instead of nexting values in a for loop.

Properties of generate function:

* `initialState`: Starting value.
* `condition`: if `true` then return this value.
* `iterate`: what should be done with the next value.

## `onErrorResumeNext`

* [File HERE (rxjs--021-onErrorResumeNext.js)](./rxjs--021-onErrorResumeNext.js)
* Runner: `npm run sample021`

`onErrorResumeNext` executes a series of Observables no matter what, even if it means swallowing errors.

Works like `concat` ... it is not concurrent.

## `combineLatest`

* [File HERE (rxjs-022-combineLatest.js)](./rxjs--022-combineLatest.js)
* Runner: `npm run sample022`

Whenever any `combineLatest` input stream emits a value, it combines the latest values emitted by each input stream.

## `isObservable`

* [File HERE (rxjs--23-isObservable.js)](./rxjs--023-isObservable.js)
* Runner: `npm run sample23`

## `pairs` (DEPRECATED)

* [File HERE (rxjs--24-pairs--DEPRECATED.js)](./rxjs--024-pairs--DEPRECATED.js)
* Runner: `npm run sample24`

Use from(Object.entries(obj)) instead.

## `race`

* [File HERE (rxjs--25-race.js)](./rxjs--025-race.js)
* Runner: `npm run sample25`

`race` returns an Observable that mirrors the first source Observable to emit an item.

## `zip`

* [File HERE (rxjs--26-zip.js)](./rxjs--026-zip.js)
* Runner: `npm run sample26`
* [File HERE (rxjs--27-zip.js)](./rxjs--027-zip.js)
* Runner: `npm run sample27`

`zip` combines multiple Observables to create an Observable whose values are calculated from the values, in order, of each of its input Observables.

## `ajax`

* [File HERE (rxjs--28-ajax.js)](./rxjs--028-ajax.js)
* Runner: `npm run sample28`
