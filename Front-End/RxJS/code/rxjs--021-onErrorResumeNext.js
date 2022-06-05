
import { from, map, onErrorResumeNext } from 'rxjs';

/*
    "onErrorResumeNext" Execute a series of Observables no matter what,
    even if it means swallowing errors.

    Works like concat, not concurrent.
*/

const observable1$ = from([
  'ONE', 'TWO', 'This value will not be returned'
]).pipe(
  map((value) => {
    if (value === 'TWO') throw new Error("value === TWO");
    else return value;
  })
);

const observable2$ = from([ 'FOUR', 'FIVE', 'SIX' ]);

console.log('--- onErrorResumeNext ---');
onErrorResumeNext(
  observable1$,
  observable2$
).subscribe({
  next: (value) => console.log(value),
  error: (error) => console.log("ERROR:", error),
  complete: () => console.log('--- complete ---')
});
