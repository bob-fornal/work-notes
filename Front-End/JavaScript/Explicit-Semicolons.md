# Explicit Semicolons

Having had scenarios where compiled code (several files merged into one) had to start with a semicolon (`;`) to avoid issues, this is one area where I have learned to pay attention.

## JavaScript Specifications

The JavaScript specification describes a feature called ***Automatic Semicolon Insertion***.

The official ECMA descriptions of the feature:

* 5th Edition: [7.9 Automatic Semicolon Insertion](http://www.ecma-international.org/ecma-262/5.1/#sec-7.9)
* 6th Edition: [11.9 Automatic Semicolon Insertion](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-automatic-semicolon-insertion)

## Implementation

The principle of the feature is to provide a little leniency when evaluating the syntax of a JavaScript program by conceptually inserting missing semicolons.

From the specification:

> Certain ECMAScript statements must be terminated with semicolons. Such semicolons may always appear explicitly in the source text.

But it goes on to state:

> For convenience, however, such semicolons may be omitted from the source text in certain situations.

This means that when typing JavaScript code the semicolons are optional .. expect when they are not. To use this feature correctly developers need to understand the exact rules of the grammar and how the automatic insertion works.

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

## Avoidance

A common misconception is that the Strict Variant (Strict Mode) of JavaScript suppresses this feature. It does not. The only way the avoid this feature is to ensure that semicolons are always inserted in the correct place. The most effective way to detect missing semicolons in JavaScript is via a lint tool such as `JSHint` or `JSLint`.This will help to detect instances of this type of problem (and others) while writing code.
