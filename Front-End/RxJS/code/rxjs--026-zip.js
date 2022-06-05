
import { map, Observable, zip } from "rxjs";

// "zip" Combines multiple Observables to create an Observable
// whose values are calculated from the values, in order, of each
// of its input Observables.

const observable1$ = new Observable((subscribe) => {
  setTimeout(() => subscribe.next('- One'), 100);
});

const observable2$ = new Observable((subscribe) => {
  setTimeout(() => subscribe.next('- Two'), 200);
});

const observable3$ = new Observable((subscribe) => {
  setTimeout(() => subscribe.next('- Three'), 300);
});

// basic example
setTimeout(() => {
  console.log('--- observable zip ---');
  zip(
    observable1$,
    observable2$,
    observable3$
  ).subscribe({
    next: (value) => console.log(value),
    complete: () => console.log('--- complete ---')
  });  
});

// basic example with a map
setTimeout(() => {
  console.log('--- observable zip (w/ map) ---');
  zip(
    observable1$,
    observable2$,
    observable3$
  ).pipe(
    map(([ first, second, third ]) => ({ first, second, third }))
  ).subscribe({
    next: (value) => console.log(value),
    complete: () => console.log('--- complete ---')
  });
}, 1000);
