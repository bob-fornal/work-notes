# Console

Beyond `console.log`

## `console.table`

```javascript
console.table([
  { userId: 1, title: 'User One', completed: false },
  { userId: 2, title: 'User Two', completed: false },
  { userId: 3, title: 'User Three', completed: true },
  { userId: 4, title: 'User Four', completed: false },
  { userId: 5, title: 'User Five', completed: true }
]);
```

## `console.assert`

Is used to assert that something is truthy. If not, it will log a message to the console.

```javascript
const isEven = n => n % 2 === 0;

for (let i = 0; i < 3; i++) {
  console.assert(isEven(i), '%s is not even!', i);
}
```

## `console.count`

Is used to check how many times a line has been called.

```javascript
for (let i = 0; i < 3; i++) {
  console.count();
}
```

```javascript
for (let i = 0; i < 3; i++) {
  console.count('outer loop');
  for (let i = 0; i < 3; i++) {
    console.count('inner loop');
  }
}
```

## `console.group` and `console.groupEnd`

```javascript
console.group('group 1');
for (let i = 0; i < 3; i++) {
  console.log(i);
}
console.groupEnd('group 1');

console.group('group 2');
for (let i = 0; i < 3; i++) {
  console.log(i);
}
console.groupEnd('group 2');
```

## `console.time` ...

`console.time`, `console.timeStart`, `console.timeEnd`, and `console.timeLog` can be used to measure time.

```javascript
console.time();
for (let i = 0; i < 1e9; i++) {
  // Intense stuff
}
console.timeEnd();
```

```javascript
console.time('first');
for (let i = 0; i < 1e9; i++) {
  // Intense stuff
}
console.timeLog('first');

console.time('second');
for (let i = 0; i < 1e9; i++) {
  // Intense stuff
}
console.timeEnd('first');
console.timeEnd('second');
```

## `console.trace`

When working with a lot of nested function calls or recursion at some point it helps to know which function was called and in what order.

```javascript
const shallow = () => deep();
const deep = () => deeper();
const deeper = () => deepest();
const deepest = () => console.trace()

shallow();
```
