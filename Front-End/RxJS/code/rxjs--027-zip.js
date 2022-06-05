
import { delay, from, map, zip } from "rxjs";

// "zip" Combines multiple Observables to create an Observable
// whose values are calculated from the values, in order, of each
// of its input Observables.

// combining in another manner
const ids$ = from([
  1,
  2,
  3
]).pipe(delay(300))

const names$ = from([
  'Bob',
  'Tim',
  'Jen'
]).pipe(delay(500));

const emails$ = from([
  'bob@gmail.com',
  'tim@gmail.com',
  'jen@gmail.com'
]).pipe(delay(1000));

console.log('--- observable zip (complex) ---');
zip(
  ids$,
  names$,
  emails$
).pipe(
    map(([ id, name, email ]) => ({ id, name, email })),
).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('--- complete ---')
});
