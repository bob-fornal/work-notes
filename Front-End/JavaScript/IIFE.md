# Immediately Invoked Function Expression (IIFE)

This is a function that is defined as an expression and executed immediately after its creation. It is therefore also know as a Self Executing Anonymous Function.

Variables that are declared within an IIFE are unable to be accessed externally, thus avoiding global scope pollution. As such, the primary reason to incorporate IIFE is immediate code execution and the resulting data privacy.

Before creating an IIFE, it is important to note that it contains two parts  ...

1. The anonymous function with lexical scope enclosed in Grouping operators.
2. Creates the immediately invoked function expression through which the JavaScript engine will directly interpret it.

Three are three ways in which you can create an IIFE ...

* Assigning it to a variable.
* Terminating it with a semicolon beforehand.
* Not assigning or terminating it.

## Assigning it to a Variable

```javascript
let sum = (function (a + b) {
  return a + b;
})(10, 40);
```

## Terminating it with a Semicolon Beforehand

```javascript
;(function (a + b) {
  return a + b;
})(6, 9);
```

## Not Assigning or Terminating It

This is the most popular way to create an IIFE.

```javascript
(function (a + b) {
  return a + b;
})(3, 6);
```

## Conclusion

An immediately invoked function can also have a name but it CANNOT be invoked again.

You can also use an arrow function to define an IIFE.

* Use an IIFE in order to avoid polluting the global namespace as most variables and functions sometimes tend to have the same name.
* To create a module pattern.
