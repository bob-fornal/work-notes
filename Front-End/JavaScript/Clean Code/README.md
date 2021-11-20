# Clean Code

Writing clean code improves the maintainability of the application and make developers productive.

## Object Destructuring

Object destructuring allows specific fields to be captured from an object, assigning them to a variable instantly. It reduces the number of code lines needed to extract the object properties and makes the code easier to understand.

Object destructuring saves a great deal of explicit variable declarations, and it is really useful in situations when ...

* Using multiple properties from an object.
* Using the same property multiple times.
* Using a property that is deeply nested in an object.

```javascript
const employee = {
  name: 'ANE01',
  email: 'Anna@example.com',
  phone: '0112–345–6789'
};

// with destucturing
const { name, email, phone } = employee;
// without destucturing
const name = employee.name;
const email = employee.email;
const phone = employee.phone;
```

The output of the two examples above (with and without destructuring) are identical. But, using object destructuring makes the code much simpler and easier to understand.

## Multiple Parameters over Single Object Parameter

When declaring a function, use multiple input parameters instead of single object inputs. This approach helps developers easily understand the minimum number of parameters that need to be passed by looking at the method signature.

```javascript
// recommended
function CustomerDetail (customerName, customerType, order) {
  console.log(`This is ${ customerName } of ${ customerType } and need ${ order }`);
}
// not recommended
function CustomerDetail (user) {
  console.log(`This is ${ user.customerName } of ${ user.customerType } and need ${ user.order }');
}
```

However, if the number of input parameters increase, you should switch back to using object parameters to avoid unnecessary code complexities.

> **Note**: When using TypeScript, it's easier to define the interface of the parameters to benefit from type checking and auto-suggestions.

## Arrow Functions

Arrow functions provide a concise way of writing JavaScript functions while resolving the problem of accessing this property inside callbacks.

When using arrow functions, curly braces, parenthesis, function, and return keywords become optional. Most importantly, the code becomes more understandable and clearer.

The example shows a comparison between a single-line arrow function without parentheses and a regular function.

```javascript
// Arrow function
const myOrder = order => console.log(`Customer need ${ order }`);
// Regular Function
function(order) {
  console.log(`Customer need ${ order }`);
}
```

Using arrow functions is not the best approach when working with object prototypes, classes, or object literals.

Also, arrow functions cannot be used as function constructors.

## Template Literals for String Concatenation

Template literals are literals delimited with backticks (\`). It provides an easy way to create multiline strings and perform string interpolation.

For example, define a placeholder in a string to get rid of all unnecessary concatenations.

```javascript
//before
var name = 'Peter';
var message = 'Hi' + name + ',';
//after
var name = 'Peter';
var message = `Hi ${ name },`;
```

## Spread Extension Operator

The spread extension operator (...) is another feature introduced with ES6. It is capable of expanding the literals like arrays into individual elements with a single line of code.

This operator is really useful to put an array or object into a new array or object or to combine multiple parameters in the array.

The below code shows how to combine 2 arrays using the spread operator. As you can see, it makes the code clean and easy to understand without loops or conditions.

```javascript
let x = [ car, bus,van ];
let y = [ bike, truck, ...x, lorry ];
console.log(y); // bike, truck, car, bus, van, lorry
```

## Avoid Callbacks

Callbacks used to be the most popular way to express and handle asynchronous functions in JavaScript programs.

For example, the following code contains 4 callback functions, and it will become even harder as the code start to grow.

```javascript
function1(function (err, data) { 
  ...  
  function2(user, function (err, data) {
    ...
     function3(profile, function (err, data) {
      ...
      function4(account, function (err, data) {
        ....
      }); 
    }); 
  });
});
```

As a solution, ES6 and ES7 introduced, Promises and Async / Await to handle asynchronous functions, and they are much easier to use and makes your code easily understandable to others.

```javascript
// Promises
function1() 
  .then(function2) 
  .then(function3) 
  .then(function2) 
  .catch((err) => console.error(err));

// Async / Await
async function myAsyncFunction() {  
  try {    
    const data1 = await function1();    
    const data2 = await function2(data1);    
    const data3 = await function3(data2);    
    return function4(data4);  
  } catch (e) {    
    console.error(err);  
  }
}
```

## Shorthand When Possible

When working with conditions, the shorthand method can save a lot of time and space.

```javascript
if (x !== '' && x !== null && x !== undefined) {
  ...
}
```

However, when using the shorthand operator, write a single condition ...

```javascript
if (!!x) {
  ...
}
```

> **Note**: This pattern is good, but you also need to check the "type" of the variable. If the expected value is a boolean, a string in this case would also allow the if condition to run.
