
import { filter, map, of } from "rxjs";

// "pipe" Function that allows you to add RxJS operators
// to the flow.

const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

console.log('--- pipe ---')
of(...data).pipe(
  map((value) => value * 10),
  filter((value) => value > 40 && value < 90)
).subscribe({
  next: (value) => console.log(value),
  error: (error) => console.log('ERROR:', error),
  complete: () => console.log('--- complete ---')
});
