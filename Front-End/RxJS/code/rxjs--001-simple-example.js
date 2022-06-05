
import { from, of } from 'rxjs';

const data = [ 1, 2, 'three', true ];

// SIMPLEST EXAMPLES

console.log('--- for each ---');
data.forEach((item) => console.log(item));

console.log('--- observable from ---');
from(data).subscribe((item) => console.log(item));

console.log('--- observable of ---');
of(...data).subscribe((item) => console.log(item));
