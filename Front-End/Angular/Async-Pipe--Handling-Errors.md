# Async Pipe, Handling Errors

Here is a very simple yet effective way of handling errors when using Async Pipe in Angular.This is a simple example of how to use Async Pipe in Angular.

```html
<ng-container *ngIf="some_observable | async"></ng-container>
```

Async Pipe has two major advantages. First, since subscriptions are handled automatically, there is no need to worry about unsubscribing to observables.

And secondly, it works with `OnPush` [change detection](https://angular.io/api/core/ChangeDetectionStrategy) automatically out of the box.

In order to handle errors properly, use `*ngIf` with async pipe. Even when using `*ngFor`, it still needs wrapped around an `*ngIf` container. This is because `*ngIf` provides `else` statement, allowing a template to be provided if the operation fails or the request is still in progress. This not only allows us to display an error message but also to show a loading indicator. Once the async operation has been resolved successfully, then the data object can be passed to the `*ngFor` loop for looping if it’s a list.

## Project

As always, start by creating a new angular project, using Angular CLI.

```script
$ ng new ng-async-pipe-error-handling
```

Next, install bootstrap for the [User Interface](https://codinglatte.com/tech/developers/angular/ui-libraries-and-frameworks-for-angular-6/).

```script
$ yarn add bootstrap
$ npm install bootstrap
```

And then, import Bootstrap CSS into the Angular project, under the application style section in `angular.json`.

```
"styles": [
  "src/styles.scss",
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
],
```

That’s it for the project setup.

## Catching Async Errors

First, to be able to determine when an async requests returns an error there will be an error property, set to null.

The type of the error object may vary depending on the type of request. Use the [catchError](https://www.learnrxjs.io/operators/error_handling/catch.html) [RXJS](https://www.learnrxjs.io/) operator, to tap into the observable. Then, set the `errorObject` to the error caught inside `catchError` operator.

```javascript
this.errorObject = null;
this.asyncOps$ = asyncService.listOfCountries().pipe(
  catchError(err => {
    this.errorObject = err;
    return throwError(err);
  })
);
```

In simple terms, this taps into the response of the async request, then checks to see if there is any error. If an error is caught, set a property of the component class with the error object. Then, inside the template, check whether this property is set. If set, parse and display error, otherwise just show a loading animation.

Next, inside our template we are going to use async pipe to subscribe to the observable. But, use the else statement to show a different template, when the async request is in progress or fails.

```html
<ng-container *ngIf="asyncOps$ | async as data; else loadingOrError">
  <!-- code here -->
</ng-container>
```

The `loadingOrError(ID)` refers to a template which shall have a template for a loading animation or an error message.

```html
<ng-template #loadingOrError> <!-- some code here --> </ng-template>
```

Inside the `loadingOrError` template, two possible messages can be displayed.

* A loading animation, indicating async request is in progress.
* Display an error, in cases where async request is completed but with error.

First, check whether the error object is set. If it’s not set show a loading message or animation, otherwise show the error message.

```html
<ng-container *ngIf="errorObject; else loading">
  <div class="col-12 text-center">
    <div class="alert alert-danger">
      {{ errorObject }}
    </div>
  </div>
</ng-container>

<ng-template #loading>
  <div class="col-12 text-center">
    Loading ...
  </div>
</ng-template>
```