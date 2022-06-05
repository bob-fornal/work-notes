# RxJS Examples

## From the **RxJS Documentation** ...

[Documentation HERE](https://rxjs.dev/guide/observable)

>   Observables are lazy Push collections of multiple values.
    - RxJS Documentation

### Pull and Push

*Pull* and *Push* are two different protocols that describe how a data *Producer* can communicate with a data *Consumer*.

#### Pull

**What is Pull?** In Pull systems, the Consumer determines when it receives data from the data Producer. The Producer itself is unaware of when the data will be delivered to the Consumer.

Every JavaScript Function is a Pull system. The function is a Producer of data, and the code that calls the function is consuming it by "pulling" out a *single* return value from its call.

>   What is the difference between an Observable and a function? Observables can "return" multiple values over time, something which functions cannot.
    - RxJS Documentation

#### Push

**What is Push?** In Push systems, the Producer determines when to send data to the Consumer. The Consumer is unaware of when it will receive that data.

Promises are the most common type of Push system in JavaScript today. A Promise (the Producer) delivers a resolved value to registered callbacks (the Consumers), but unlike functions, it is the Promise which is in charge of determining precisely when that value is "pushed" to the callbacks.

#### Observables

RxJS introduces Observables, a new Push system for JavaScript. An Observable is a Producer of multiple values, "pushing" them to Observers (Consumers).

* A **Function** is a lazily evaluated computation that synchronously returns a single value on invocation.
* A **generator** is a lazily evaluated computation that synchronously returns zero to (potentially) infinite values on iteration.
* A **Promise** is a computation that may (or may not) eventually return a single value.
* An **Observable** is a lazily evaluated computation that can synchronously or asynchronously return zero to (potentially) infinite values from the time it's invoked onwards.

## From the **Angular Documentation** ...

[Documentation HERE](https://www.telerik.com/blogs/angular-basics-introduction-observables-rxjs-part-1)

Reactive programming is an asynchronous programming paradigm concerned with data streams and the propagation of change. RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using observables that makes it easier to compose asynchronous or callback-based code.

>   "An observable represents a sequence of values which can be observed."
    — TC39

RxJS provides an implementation of the Observable type, which is needed until the type becomes part of the language and until browsers support it. The library also provides utility functions for creating and working with observables. These utility functions can be used for:

* Converting existing code for async operations into observables
* Iterating through the values in a stream
* Mapping values to different types
* Filtering streams
* Composing multiple streams

### Basic Usage and Terms

As a publisher, you create an `Observable` instance that defines a *subscriber* function. This is the function that is executed when a consumer calls the `subscribe()` method. The subscriber function defines how to obtain or generate values or messages to be published.

To execute the observable you have created and begin receiving notifications, you call its `subscribe()` method, passing an *observer*. This is a JavaScript object that defines the handlers for the notifications you receive. The `subscribe()` call returns a `Subscription` object that has an `unsubscribe()` method, which you call to stop receiving notifications.

## Subjects

[Article HERE](https://levelup.gitconnected.com/rxjs-subjects-explained-with-examples-78ae7b9edfc)

There are four types of Subjects in RxJS:

1. Subject
2. BehaviorSubject
3. RelaySubject
4. AsyncSubject

### Subject

An RxJS `Subject` is a special type of `Observable` that allows values to be multicasted to many `Observers`. A `Subject` is like an `Observable`, but can multicast to many `Observers`.

Every `Subject` is an `Observable`.

### BehaviorSubject

`BehaviorSubject` stores the latest value emitted to its consumers, and whenever a new `Observer` subscribes, it will immediately receive the “current value”.

`BehaviorSubjects` are useful for representing “values over time”. For instance, an event stream of birthdays is a `Subject`, but the stream of a person’s age would be a `BehaviorSubject`.

### ReplaySubject

A `ReplaySubject` is similar to a `BehaviorSubject` in that it can send old values to new subscribers, but it can also *record* a part of the `Observable` execution. A `ReplaySubject` records multiple values from the `Observable` execution and replays them to new subscribers.

Previously sent data can be “replayed” to a new observer.

### ReplaySubject

A `AsyncSubject` will emit the last value to observers when the sequence is completed.

## Example Code

### Simplest Example

* [File HERE (rxjs--001-simple-example.js)](./code/rxjs--001-simple-example.js)
* Runner: `npm run sample001`

### Using an Observer

* [File HERE (rxjs--002-observer.js)](./code/rxjs--002-observer.js)
* Runner: `npm run sample002`

The observer is an object with optional keys (`next`, `error`, and `complete`) that provide functionality for the described scenarios. This object is passed into the subscription.

### Basic Observable and Observer

* [File HERE (rxjs--003-Observable-observer.js)](./code/rxjs--003-Observable-observer.js)
* Runner: `npm run sample003`

>   "If either an Error or Complete notification is delivered,
    then nothing else can be delivered afterwards."
    - RxJS documentation

### Basic Observable and Subscriber

* [File HERE (rxjs--004-Observable-subscriber.js)](./code/rxjs--004-Observable-subscriber.js)
* Runner: `npm run sample004`

### Subscriber and Unsubscribe

* [File HERE (rxjs--005-subscriber-unsubscribe.js)](./code/rxjs--005-subscriber-unsubscribe.js)
* Runner: `npm run sample005`

>   "Subscription: represents the execution of an Observable,
    is primarily useful for canceling the execution.""
    — RxJS documentation

### `pipe` Function

* [File HERE (rxjs--006-pipe.js)](./code/rxjs--006-pipe.js)
* Runner: `npm run sample006`

The `pipe` function that allows you to add RxJS operators to the flow.

### `concat`

* [File HERE (rxjs--007-concat.js)](./code/rxjs--007-concat.js)
* Runner: `npm run sample007`

`concat` concatenates multiple Observables together by sequentially emitting their values, one Observable after the other.

### `merge`

* [File HERE (rxjs--008-merge.js)](./code/rxjs--008-merge.js)
* Runner: `npm run sample008`

`merge` flattens multiple Observables together by blending their values into one Observable.

### `forkJoin`

* [File HERE (rxjs--009-forkJoin-object)](./code/rxjs--009-forkJoin-object.js)
* Runner: `npm run sample009`
* [File HERE (rxjs--010-forkJoin-array)](./code/rxjs--010-forkJoin-array.js)
* Runner: `npm run sample010`

`forkJoin` waits for Observables to complete and then combine the last values they emitted.

### `fromEvent`

* [File HERE (rxjs--011-fromEvent)](./code/rxjs--011-fromEvent.js)
* Runner: `npm run sample011`

`fromEvent` creates an Observable from DOM events, NodeJS EventEmitter eventsc or others.

### `iif`

* [File HERE (rxjs--012-iif)](./code/rxjs--012-iif.js)
* Runner: `npm run sample012`

`iif`: If statement for Observables.

### `defer`

* [File HERE (rxjs--013-defer.js)](./code/rxjs--013-defer.js)
* Runner: `npm run sample013`

`defer` creates the Observable lazily, that is, only when it is subscribed.

### `partition`

* [File HERE (rxjs--014-partition.js)](./code/rxjs--014-partition.js)
* Runner: `npm run sample014`

`partition` outputs an array with two Observables that partition the values from the source Observable through the given predicate function.

### `range`

* [File HERE (rxjs--015-range.js)](./code/rxjs--015-range.js)
* Runner: `npm run sample015`

`range` emits a sequence of numbers in a range.

### `interval`

* [File HERE (rxjs--016-interval.js)](./code/rxjs--016-interval.js)
* Runner: `npm run sample016`

`interval` emits incremental numbers periodically in time.

### `timer`

* [File HERE (rxjs--017-timer.js)](./code/rxjs--017-timer.js)
* Runner: `npm run sample017`

`timer` is like `interval`, but you can specify when the emissions should start.

### `bindCallBack`

* [File HERE (rxjs--018-bindCallBack.js)](./code/rxjs--018-bindCallBack.js)
* Runner: `npm run sample018`

Given a function `f` of type `f(x, callback)` and it will return a function `g` that when called as `g(x)` will output an Observable.

### `bindNodeCallback`

* [File HERE (rxjs--019-bindNodeCallback.js)](./code/rxjs--019-bindNodeCallback.js)
* Runner: `npm run sample019`

`bindNodeCallback` is just like `bindCallback`, but the callback is expected to be of type `callback(error, result)`.

### `generate`

* [File HERE (rxjs--020-generate.js)](./code/rxjs--020-generate.js)
* Runner: `npm run sample020`

Use `generate` instead of nexting values in a for loop.

Properties of generate function:

* `initialState`: Starting value.
* `condition`: if `true` then return this value.
* `iterate`: what should be done with the next value.

### `onErrorResumeNext`

* [File HERE (rxjs--021-onErrorResumeNext.js)](./code/rxjs--021-onErrorResumeNext.js)
* Runner: `npm run sample021`

`onErrorResumeNext` executes a series of Observables no matter what, even if it means swallowing errors.

Works like `concat` ... it is not concurrent.

### `combineLatest`

* [File HERE (rxjs-022-combineLatest.js)](./code/rxjs--022-combineLatest.js)
* Runner: `npm run sample022`

Whenever any `combineLatest` input stream emits a value, it combines the latest values emitted by each input stream.

### `isObservable`

* [File HERE (rxjs--23-isObservable.js)](./code/rxjs--023-isObservable.js)
* Runner: `npm run sample23`

### `pairs` (DEPRECATED)

* [File HERE (rxjs--24-pairs--DEPRECATED.js)](./code/rxjs--024-pairs--DEPRECATED.js)
* Runner: `npm run sample24`

Use from(Object.entries(obj)) instead.

### `race`

* [File HERE (rxjs--25-race.js)](./code/rxjs--025-race.js)
* Runner: `npm run sample25`

`race` returns an Observable that mirrors the first source Observable to emit an item.

### `zip`

* [File HERE (rxjs--26-zip.js)](./code/rxjs--026-zip.js)
* Runner: `npm run sample26`
* [File HERE (rxjs--27-zip.js)](./code/rxjs--027-zip.js)
* Runner: `npm run sample27`

`zip` combines multiple Observables to create an Observable whose values are calculated from the values, in order, of each of its input Observables.

### `ajax`

* [File HERE (rxjs--28-ajax.js)](./code/rxjs--028-ajax.js)
* Runner: `npm run sample28`
