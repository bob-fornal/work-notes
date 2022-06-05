
import { AsyncSubject } from 'rxjs';

// A AsyncSubject will emit the last value to observers when the
// sequence is completed.

const subject = new AsyncSubject();
 
subject.subscribe({
  next: (value) => console.log(`observer A: ${ value }`)
});
 
subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);
 
subject.subscribe({
  next: (value) => console.log(`observer B: ${ value }`)
});
 
subject.next(5);
subject.complete();