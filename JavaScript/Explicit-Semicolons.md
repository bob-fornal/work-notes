# Explicit Semicolons

Having had scenarios where compiled code (several files merged into one) had to start with a semicolon (`;`) to avoid issues, this is one area where I have learned to pay attention.

## Gotchas: Automatic Semicolon Insertion

Many developers lazily avoiding writing the `;` and assuming the parser will do the job correctly. Here are some examples that prove this to be an invalid assumption.

### Example 1

```javascript
const test = () => {
  return 
  {
    ok : true
  }
}
console.log(test())
```

Most developers would expect the output of this to be an `object` with a property `ok` set to `true`. Instead, the output is `undefined`. This is because the curly brace starts on a new line, ASI changes the above code to ...

```javascript
const test = () => {
 return;
  {
    ok : true
  }
}
```

**Fix**: Use curly braces on the right of return and explicit semicolons ...

```javascript
const test = () => {
  return {
    ok : true
  };
};
```

### Example 2

```javascript
const a = 1
const b = 2
(a+b).toString()
```

This code errors: `Uncaught ReferenceError: b is not defined`. This is because the parenthesis on the third line is interpreted as a function argument. This code is converted to this ...

```
const a = 1;
const b = 2(a+b).toString();
```

> In the circumstance that an assignment statement must begin with a left parenthesis, it is a good idea for the programmer to provide an explicit semicolon at the end of the preceding statement rather than to rely on automatic semicolon insertion.
> 
> — ECMA-International.org
