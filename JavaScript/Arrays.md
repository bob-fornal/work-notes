# Arrays

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