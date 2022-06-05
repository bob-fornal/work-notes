
import { iif } from "rxjs";

// "iif" If statement for Observables.

let shouldSubscribeToFirst = false;

const firstOrSecond$ = iif(
  () => shouldSubscribeToFirst,
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('- First ...');
    }, 1000);
  }),
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('- Second ...');
    }, 1000);
  })
);

console.log('--- iif ---');

shouldSubscribeToFirst = true;
firstOrSecond$.subscribe((value) => console.log(`-- Selected first: ${ value }`));

shouldSubscribeToFirst = false;
firstOrSecond$.subscribe((value) => console.log(`-- Selected second: ${ value }`));
