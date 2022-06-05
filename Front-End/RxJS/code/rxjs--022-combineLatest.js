
import { Observable, combineLatest } from "rxjs";

// "combineLatest" Whenever any input stream emits a value, it combines
// the latest values emitted by each input stream

const observable1$ = new Observable((subscribe) => {
  setTimeout(() => subscribe.next('- One'), 100);
  setTimeout(() => subscribe.next('- One_1'), 500);
  setTimeout(() => subscribe.next('- One_2'), 1000);
});

const observable2$ = new Observable(subscribe => {
  setTimeout(() => subscribe.next('- Two'), 200);
  setTimeout(() => subscribe.next('- Two_1'), 800);
  setTimeout(() => subscribe.next('- Two_2'), 1200);
});

const combined$ = combineLatest([ observable1$, observable2$ ]);

console.log('--- combineLatest ---');
combined$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('--- complete ---')
});
