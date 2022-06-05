
import { generate } from "rxjs";

/*
    "generate" Use instead of nexting values in a for loop

    Properties of generate function:
      initialState: Starting value;
      condition: if "true" -> return this value;
      iterate: what should be done with the next value;
*/

const numbers$ = generate({
  initialState: 1,
  condition: (value) => value <= 3,
  iterate: (value) => value + 1
});

console.log('--- generate ---');
numbers$.subscribe({
  next: (value) => console.log('- Result:', value),
  complete: () => console.log('--- complete ---')
});
