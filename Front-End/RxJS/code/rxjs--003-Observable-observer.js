
import { Observable } from "rxjs";

/*
    "If either an Error or Complete notification is delivered,
    then nothing else can be delivered afterwards."
    — RxJS documentation
*/

const observable$ = new Observable((subscriber) => {
  subscriber.next('One');
  subscriber.next('Two');
  subscriber.next('Three');

  setTimeout(() => {
    subscriber.next('Four');
    subscriber.complete();
  }, 1000);

  setTimeout(() => {
    subscriber.error('--- some error ---');
  }, 1200);
});

const observer = {
  next: (value) => console.log(value),
  error: (error) => console.log('ERROR:', error),
  complete: () => console.log('--- complete ---')
};

console.log('--- observable ---');
observable$.subscribe(observer);
