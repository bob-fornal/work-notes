# Arrays

## Methods

It is important to remember that `forEach` can be overused.

**NOTE**: These methods can be chained.

### `forEach`

To take a specific action (such as `console.log`) by iterating over each item in the array.

```javascript
const items =  [ 1, 2, 3, 4, 5];
items.forEach(item => console.log(item));
```

**NOTE**: `forEach` does not return a value.

### `filter`

As named, it allows the array to be filtered on a condition.

```javascript
const items = [ 1, 2, 3, 4, 5 ];
const evenValue = items.filter(value => {
  return value % 2 === 0;
});
```

### `map`

When an array needs to be transformed into another array.

```javascript
const items = [ 1, 2, 3, 4, 5 ];
const result = items.map(item => {
  return item * 2;
});
```

### `reduce`

When a single value is needed from an array.

```javascript
const items = [ 1, 2, 3, 4, 5 ];
const sum = items.reduce((accumulator, value) => {
  return accumulator += value;
}, 0);
```

When using `reduce`, return the accumulator (value that is returned by the reduce method) in each iteration and initialize this accumulator (in the example the accumulator is initialized to 0).

### `find`

To find an item that fits a condition.

```javascript
const items = [ 1, 2, 3, 4, 5 ];
const item = items.find(item => item === 3);
```

### `some`

To check if one (or more) items meets a condition.

```javascript
const items = [ 1, 2, 3, 4, 5 ];
const hasTwo = items.some(item => item === 2);
```

`some` returns a boolean if at least one item matches the condition.

### `every`

`every` is similar to `some`, it will check if **ALL ITEMS** match a condition.

```javascript
const items = [ 1, 2, 3, 4, 5 ];
const arePositive = items.every(item => item > 0);
```

## Array Destructuring

With Object Destructuring the keys can be listed in any order. With Arrays, the position of the variable name in the array matters.

To ignore values, just leave a `, ,` ...

```javascript
const [street, , , city] = [ 'La Rosa Drive', '2000', '43123', 'Grove City' ];
```

## Array Includes

Using the `.includes` functionality reveals the code's intent in a much cleaner way.

```javascript
const array = [ 1, 2, 3, 4, 5 ];

const containsFour = (array.indexOf(4) > -1);
const constinsThree = array.includes(3);
```