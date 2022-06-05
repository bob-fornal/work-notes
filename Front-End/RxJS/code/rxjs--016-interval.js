
import { interval, take } from "rxjs";

// "interval" Emits incremental numbers periodically in time.

const numbers$ = interval(1000).pipe(
  take(5)
);

console.log('--- interval ---');
numbers$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('--- complete ---')
});
