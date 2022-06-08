# RxJS Code Patterns

These are functional patterns that i use both for the functionality and the testability.

## ApiService

* [File HERE (pattern--001-api-calls.js)](./pattern--001-api-call.js)
* [File HERE (pattern--001-api-service.js)](./pattern--001-api-service.js)
* Runner: `npm run pattern001`

Using a `BehaviorSubject` both ensures that we have a default value for the subscriber(s) and are able to get data to those subscriber(s) whenever at request goes out.

## TypeAhead

* [File HERE (pattern--002-type-ahead.js)](./pattern--002-type-ahead.js)
* Runner: `npm run pattern002`

This pattern sets up an observable that can be used in conjunction with an input change event to query some source with a debounce time in place.
