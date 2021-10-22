## Arrow Functions

Arrow functions provide (almost) an alternative way to write functions in JavaScript, with a few differences:
 
 - do not have their own `this`
 - cannot be used as constructors
 - cannot be used as generators

```javascript
parameter => expression;
(param1, param2, param3) => expression;
name => `Hello ${ name }`;
name => ({ id: 1, name });
(name, height) => ({ name, height });
```

Note that return is also omitted because it is implicit in arrow functions.

`this` is the same as the scope where this function is defined.