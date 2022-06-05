
import { merge, Observable } from "rxjs";

// "merge" Flattens multiple Observables together by
// blending their values into one Observable.

const observable1$ = new Observable(subscribe => {
  setTimeout(() => {
    subscribe.next('- One 1');
  }, 100);

  setTimeout(() => {
    subscribe.next('- One 2');
  }, 500);

  setTimeout(() => {
    subscribe.next('- One 3');
  }, 1000);
});

const observable2$ = new Observable(subscribe => {
  setTimeout(() => {
    subscribe.next('-- Two 1');
  }, 200);

  setTimeout(() => {
    subscribe.next('-- Two 2');
  }, 800);

  setTimeout(() => {
    subscribe.next('-- Two 3');
  }, 1200);
});

const mergedObservables$ = merge(observable1$, observable2$);

console.log('--- merge ---');
mergedObservables$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('--- complete ---')
});
