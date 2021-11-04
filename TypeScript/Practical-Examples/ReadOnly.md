# `Readonly<T>`

Starting with a small example: A simple function which takes in an array of numbers and returns an array with all elements sorted.

```typescript
function sortNumbers(array: Array<number>) {
  return array.sort((a, b) => a - b);
}
```

Now look at the code below and look if everything looks good. Think about what the console output will be. I recommend taking some time and actually thinking about it!

```typescript
const numbers = [7, 3, 5];
const sortedNumbers = sortNumbers(numbers);
console.log(sortedNumbers);
console.log(numbers);
```

## Problem

The first output is pretty simple. It is `[3, 5, 7]`. 

The second output is the same!

Arrays and objects are quite special in JavaScript. If they are passed to a function it will pass the reference to the array or object which means it will mutate the original array if you call certain functions like `Array.sort` which are in-place.

## `Readonly<T>` Approach

Changing the code a little bit ...

```typescript
function sortNumbers(array: Readonly<Array<number>>) {
  return array.sort((a, b) => a - b);
}
```

This does not compile though. TypeScript gives us the following error `Property 'sort' does not exist on type 'readonly number[]'`.

A copy of the array should be sorted rather than sorting the array itself. There are many ways to copy an array in JS like spreading it (`[...array]`), using `array.concat()`, `Array.from(array)`, or `array.slice()`.

```typescript
function sortNumbers(array: Readonly<Array<number>>) {
  return [...array].sort((a, b) => a - b);
}
```
