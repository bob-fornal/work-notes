
import { Observable } from "rxjs";

/*
    "Subscription: represents the execution of an Observable,
    is primarily useful for canceling the execution.""
    — RxJS documentation
*/

const timer$ = new Observable((subscriber) => {
  let iteration = 0;
  const intervalId = setInterval(() => {
    if (iteration === 10) subscriber.unsubscribe();
    subscriber.next(iteration++);
  }, 500);

  return () => {
    clearInterval(intervalId);
    console.log('- Cleaned up ...');
  };
});

const observer = {
  next: (value) => console.log(value),
  error: (error) => console.log('ERROR:', error),
  complete: () => console.log('--- complete ---')
};

console.log('--- Observable unsubscribe ---');
timer$.subscribe(observer);
