
import { Observable, race } from 'rxjs';

// "race" Returns an Observable that mirrors the first source
// Observable to emit an item.

const observable1$ = new Observable((subscribe) => {
  setTimeout(() => subscribe.next('- One'), 100);
});

const observable2$ = new Observable((subscribe) => {
  setTimeout(() => subscribe.next('- Two'), 200);
});

const observable3$ = new Observable((subscribe) => {
  setTimeout(() => subscribe.next('- Three'), 300);
});

console.log('--- race ---');
race(
  observable1$,
  observable2$,
  observable3$
).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('--- complete ---')
});
