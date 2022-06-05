
import { bindNodeCallback } from "rxjs";

// "bindNodeCallback" just like bindCallback, but the callback is
// expected to be of type callback(error, result)

const aCallbackFunction = (a, b, callback = (_, number) => number) => {
  if (a < 0) callback('Property "a" is less than zero', undefined);
  if (b < 0) callback('Property "b" is less than zero', undefined);
  
  setTimeout(() => {
    callback(undefined, a + b);
  }, 1000);
};

const bound = bindNodeCallback(aCallbackFunction);

const results$ = bound(-100, 200);

console.log('--- bindNodeCallback ---')
results$.subscribe({
  next: (value) => console.log('- Result:', value),
  error: (error) => console.log('ERROR:', error),
  complete: () => console.log('--- complete ---')
});
