
import { from } from 'rxjs';

// "pairs" (deprecated) use from(Object.entries(obj)) instead.

const anObject = {
  id: 123,
  name: 'Bob Fornal',
  email: 'email@google.com'
};

console.log('--- pairs (DEPRECATED) ---');
from(Object.entries(anObject)).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('--- complete ---')
});
