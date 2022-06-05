
import { Subject, from } from "rxjs";

// Every Subject is an Observer.

const subject = new Subject();
 
subject.subscribe({
  next: (value) => console.log(`observer A: ${ value }`)
});
subject.subscribe({
  next: (value) => console.log(`observer B: ${ value }`)
});

const observable = from([1, 2, 3]);
observable.subscribe(subject);

subject.subscribe({
  next: (value) => console.log(`observer C: ${ value }`)
});
