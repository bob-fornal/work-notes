
import { Observable } from "rxjs";

const subscribe = (subscriber) => {
  const intervalId = setInterval(() => {
    console.log('- Interval ...');
  }, 500);

  [ 'One', 'Two', 'Three' ].forEach((value) => {
    subscriber.next(value + '_NEXT');
    if (value === 'This error is not thrown') {
      subscriber.error('--- some error ---');
    }
  });

  setTimeout(() => {
    console.log('- Triggering complete()');
    subscriber.complete();
  }, 2000);

  return () => {
    clearInterval(intervalId);
    console.log('- Cleaned up ...');
  };
};

// The "$" sign is a RxJS convention that it stores an Observable
const fourObservable$ = new Observable(subscribe);

const observer = {
  next: (value) => console.log(value),
  error: (error) => console.log('ERROR:', error),
  complete: () => console.log('--- complete ---')
};

console.log('--- observable ---');
fourObservable$.subscribe(observer);
