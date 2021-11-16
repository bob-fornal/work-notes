# Callbacks

A callback in JavaScript is a function that is passed to another function as a parameter and is executed or invoked within that other function. The function needs to wait for another function to execute or return a value, causing a chain of functionalities to form (as JavaScript is inherently asynchronous). Callbacks are employed to create a synchronous operation.

```javascript
const hello = (greeting) => {
  console.log(greeting + ' Earthling'); 
}
const greet = (callback) => {
  greeting = "Bonjour";
  callback(greeting);
}

greet(hello); // Bonjour Earthling
```

The function `hello` is passed as the callback argument to the `greet` function. Before `hello` is executed it waits for greet to execute.
