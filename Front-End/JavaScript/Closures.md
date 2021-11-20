# Closures

A closure is a way to let an inner function access the scope of an outer function. The inner function is technically the closure and again is able to access variables defined within the parent (or outer) function, as well as variables defined within its own scope and global variables. However, the parent function does not have access to the variables of the inner function.

Closures are helpful to employ to pass variables, arrays, or methods from an outer function to an inner function in order to extend behavior.

```javascript
const init = (name) => { // outer scope
  return function () { // inner scope
    return `Hello ${ name }`;
  }
};
```

... or ...

```javascript
  const client = GenerateClient(API_KEY);
  client.getInformation();
```

Swipe is a closure.

It lets the inner function: getAccounts, reuse the SWIPE_API_KEY we pass to the outer function: Swipe.

This way, you don't have to pass the SWIPE_API_KEY every time you want to call a function from Swipe.