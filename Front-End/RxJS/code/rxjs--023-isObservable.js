
import { Observable, isObservable, of, from } from 'rxjs';

// "isObservable"

const observable1$ = new Observable((subscribe) => {
  setTimeout(() => subscribe.next('- One'), 100);
});

const observable2$ = of(1, 2, 3, 4, 5);

const observable3$ = from(Promise.resolve(6));

const result = {
  isObservable1: isObservable(observable1$),
  isObservable2: isObservable(observable2$),
  isObservable3: isObservable(observable3$)
};

console.log(result);
