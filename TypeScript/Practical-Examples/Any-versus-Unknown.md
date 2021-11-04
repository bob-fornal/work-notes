# `any` versus `unknown`

## Problem

Looking at an example ...

```typescript
const someArray: Array<any> = [];

// add some values
someArray.push(1);
someArray.push('Hello');
someArray.push({ age: 42 });
someArray.push(null);
```

An array has been created that can potentially have all available types in it. A number, a string and an object are added.

```typescript
const someArray: Array<any> = [];

// ... adding the values
someArray.forEach((entry) => {
  console.log(entry.age);
});
```
This code is actually valid TypeScript and will compile without any issues. But it will fail at run time. Why? Because as soon as we loop over an entry which is `null` or `undefined`, and then try to access `.age`, it will throw an error.

```script
Uncaught TypeError: Cannot read properties of null.
```

## `unknown` Approach

Instead of typing the array as `Array<any>` it can just use `Array<unknown>`. Using the same code but with that change it will look like this ...

```typescript
const someArray: Array<unknown> = [];

// ... adding the values
someArray.forEach((entry) => {
  console.log(entry.age);
});
```

And, this code will not compile. Instead, TypeScript shows the following error when we try to access `entry.age`.

```typescript
// ... other code

someArray.forEach((entry) => {
  // Object is of type 'unknown'
  console.log(entry.age);
});
```

Using `unknown` enforces a check of the type (or explicitly casting the value) before doing something with a value with is `unknown`.

```typescript
// ... other code

type Human = { name: string; age: number };

someArray.forEach((entry) => {
  // if it's an object, we know it's a Human
  if (typeof entry === 'object') {
    console.log((entry as Human).age);
  }
});
```

In this case the value is checked as an object before accessing the `.age` property.

`any` is basically saying the TypeScript compiler to not check that bit of code. Avoid using `any` whenever possible.  It is better to use `unknown` instead because it enforces the type check of the value before using it.

**Note**: don't use `typeof x === 'object'` to check whether something is a valid object, because it will return true for arrays as well.
