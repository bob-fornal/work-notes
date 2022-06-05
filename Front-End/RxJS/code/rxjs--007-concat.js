
import { concat, from } from "rxjs";

// "concat" Concatenates multiple Observables together by
// sequentially emitting their values, one Observable
// after the other.

const data1 = [ 'One', 'Two', 'Three' ];
const data2 = [ 'Four', 'Five', 'Six' ];

const observable1$ = from(data1);
const observable2$ = from(data2);

console.log('--- concat ---');
concat(observable1$, observable2$).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('--- complete ---')
});
