
import { Observable, partition } from "rxjs";

// "partition" outputs an array with two Observables
// that partition the values from the source Observable
// through the given predicate function.

const observable$ = new Observable((subscribe) => {
  setTimeout(() => subscribe.next('- One'), 500);
  setTimeout(() => subscribe.next('- One_1'), 1500);
  setTimeout(() => subscribe.next('- One_2'), 2500);
  setTimeout(() => subscribe.next('-- Two'), 1000);
  setTimeout(() => subscribe.next('-- Two_1'), 2000);
  setTimeout(() => subscribe.next('-- Two_2'), 3000);
});

const [ obs_1$, obs_2$ ] = partition(observable$, (value) => value.includes('One'));

obs_1$.subscribe((value) => console.log("Observable 1 :", value));
obs_2$.subscribe((value) => console.log("Observable 2 :", value));
