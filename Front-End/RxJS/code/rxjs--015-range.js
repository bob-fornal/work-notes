
import { range } from "rxjs";

// "range" emits a sequence of numbers in a range.

const numbers = range(1, 5);

console.log('--- range ---');
numbers.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('--- complete ---')
});
