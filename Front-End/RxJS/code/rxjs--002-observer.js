
import { from } from 'rxjs';

const data = [ 'One', 'Two', 'Three' ];

// Using an OBSERVER
const observer = {
  next: (value) => console.log(value),
  error: undefined,
  complete: () => console.log('--- complete ---')
};

console.log('--- observable observer ---');
from(data).subscribe(observer);
