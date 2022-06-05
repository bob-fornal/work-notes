
import { defer, delay, from, interval, of, take } from "rxjs";

// "defer" Creates the Observable lazily, that is, only
// when it is subscribed.

const handler = (value) => defer(() => {
  switch (value) {
    case 1:
      return interval(1000).pipe(take(4));
    case 2:
      return of('Some value').pipe(delay(1000));
    case 3:
      return from([ 1, 2, 3, 4, 5 ]);
  }
});

console.log('--- defer (3) ---');
handler(3).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('--- complete ---')
});
