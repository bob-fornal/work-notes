
import { take, timer } from "rxjs";

// "timer" like “interval”, but you can specify when should the emissions start.

const numbers$ = timer(0, 1000).pipe(
  take(5)
);

console.log('--- timer ---');
numbers$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('--- complete ---')
});
