import { BehaviorSubject } from 'rxjs';

// Send the last data to new observers.

const subject = new BehaviorSubject(0);
 
subject.subscribe({
  next: (value) => console.log(`observer A: ${ value }`)
});

subject.subscribe({
  next: (value) => console.log(`observer B: ${ value }`)
});
 
subject.next(1);
subject.next(2);
subject.next(3);

subject.subscribe({
  next: (value) => console.log(`observer C: ${ value }`)
});

subject.next(4);
