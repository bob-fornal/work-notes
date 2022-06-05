
import { EventEmitter } from 'events';
import { fromEvent } from "rxjs";

// "fromEvent" Creates an Observable from DOM events,
// or Node.js EventEmitter events or others.

const emitter = new EventEmitter();

setTimeout(() => {
  emitter.emit('data', 'First emitted data');
}, 500);
setTimeout(() => {
  emitter.emit('data', 'Second emitted data');
}, 1000);

const observer = {
  next: (value) => console.log(value),
  error: (error) => console.log('ERROR:', error),
  complete: () => console.log('--- complete ---')
};

console.log('--- fromEvent ---');
fromEvent(emitter, 'data').subscribe(observer);
