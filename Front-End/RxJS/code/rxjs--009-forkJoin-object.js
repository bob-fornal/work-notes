
import { forkJoin, of } from "rxjs";

// "forkJoin" Wait for Observables to complete and then
// combine the last values they emitted.

let halves = 0;

console.log('--- forkJoin object ---');
console.log(`timer: ${ halves } x 500ms ...`);

const intervalId = setInterval(() => {
  console.log(`timer: ${ ++halves } x 500ms ...`);
}, 500);

const observable$ = forkJoin({
  one: of(11, 22, 33, 44),
  two: Promise.resolve(8),
  three: new Promise((resolve) => {
    setTimeout(() => {
      resolve(100);
    }, 2000);
  })
});

const observer = {
  next: (value) => console.log(value),
  complete: () => {
    console.log('--- complete ---');
    clearInterval(intervalId);
  }
};

observable$.subscribe(observer);
