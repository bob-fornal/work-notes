
import { ReplaySubject } from "rxjs";

// Previously sent data can be “replayed” to a new observer.

const subject = new ReplaySubject(2);
 
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
