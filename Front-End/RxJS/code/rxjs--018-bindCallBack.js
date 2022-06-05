
import { bindCallback } from "rxjs";

// "bindCallback" Give it a function “f” of type f(x, callback) and it
// will return a function "g” that when called as g(x) will output an
// Observable.

const aCallbackFunction = (a, b, callback = (value) => value) => {
  if (a < 0) throw Error('"a" < 0');

  setTimeout(() => {
    callback(a + b);
  }, 1000);
};

const bound = bindCallback(aCallbackFunction);

const result$ = bound(300, 200);

console.log('--- observablue bindCallBack ---');
result$.subscribe({
  next: (value) => console.log('Result:', value),
  error: (error) => console.log('ERROR:', error),
  complete: () => console.log('--- complete ---')
});
