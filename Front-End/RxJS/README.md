# RxJS Examples

* Code Samples [HERE](./code/README.md)
* Code Patterns [HERE](./patterns/README.md)

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
