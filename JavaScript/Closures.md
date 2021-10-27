# Closures

A closure is a way to let an inner function access the scope of an outer function.

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