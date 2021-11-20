# Why Use TypeScript

It's simple. It solves problems.

TypeScript is a superset of JavaScript.

* [Downsides Of TypeScript](Downsides-of-TypeScript.md)

## 1. Type Checking

This is why typescript exists. It adds type checking over javascript. It stops developers from writing stupid code.

```javascript
const addNumbers = (a, b) => a + b;
addNumbers('1', '2'); // '12'
```

This is a stupid example. When working on a bigger project, this kind of bug can happen easily. Developers waste hours trying to fix the code.

```typescript
const addNumbers = (a: number, b: number) => a + b;
```

Now when a string is passed it will give an error so that it can be fixed.

## 2. Compile Time Errors

Instead of the code giving the error at code run time, TypeScript will throw compile errors.

## 3. Easy to Understand

TypeScript makes your code a lot easier to read and understand.

## 4. Object Oriented Development

TypeScript allows object-oriented programming concepts easily. Like class, interface, inheritance, and so on.

## 5. Predictable Code

With type checking, then the developer knows where to put what type of data. And which code will return which type of output.

## 6. Great Intellisense

There is far better IntelliSense with TypeScript than JavaScript.

## 7. Next-Generation Code

TypeScript allow next generation code. It will compile the to older versions so that it stays compatible with older browsers and JavaScript runtime.

## 8. Support with most Libraries

Most of the third-party libraries has TypeScript support.

## 9. Great Community

TypeScript has a huge community. It is so much popular that most developer uses TypeScript over JavaScript.

## 10. Absolute Import and Alias

Use absolute import and import aliases with TypeScript.

```typescript
// Relative Import
import User from '../../models/User';
// Absolute Import
import User from 'models/User';
```

