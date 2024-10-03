# Average Function

## Problem

Consider the following simple function that calculates the average for an array of numbers ...

```typescript
function average(numbers: number[]) {
  const sum = numbers.reduce((a, b) => a + b, 0);
 
  return sum / numbers.length;
}
```

It works as expected for values like 5, 10, 15.

```typescript
console.log(average([5, 10, 15])) // 10
```

But, assuming an “average calculation domain expert”, there are edge cases ...

```typescript
console.log(average([])) // NaN
```

Because of an empty array, this becomes a divide by zero issue.

## Runtime Error Approach

The first thing that probably comes to mind to fix this problem is using an error throwing mechanism to communicate the edge-case problem to the developer ...

```typescript
class EmptyArrayError extends Error {
  constructor() {
    super("Cannot calculate the average of an empty array");
  }
}
 
function average(numbers: number[]) {
  if (numbers.length === 0) {
    throw new EmptyArrayError();
  }
 
  const sum = numbers.reduce((a, b) => a + b, 0);
 
  return sum / numbers.length;
}
```
TypeScript has no mechanisms that would force a developer to handle native JavaScript errors. TypeScript does not have native typed errors support at all. If you look at a “Promise” for instance, a successful path can be easily typed, but the error path is typed as “any”. This means that the aforementioned solution could make things even worse. 

One of the good developer experience practices in libraries is "being a good citizen." That means the library code should not break the context where it is used. Throwing an error that crashes an application is clearly a case that breaks this rule.

## Alternative Approach

If the only way to output something is the output value, then why not simply return the error as an output value?

```typescript
function average(numbers: number[]) {
  if (numbers.length === 0) {
    return new EmptyArrayError();
  }
 
  const sum = numbers.reduce((a, b) => a + b, 0);
 
  return sum / numbers.length;
}
```

Notice how the `throw` keyword has been replaced with `return`.

Now, TypeScript is smart enough to deduce that function may not return a numeric value in all of the cases. It can warn the developer where it is possible to mix the numbers against the error.

In such a case, developers are forced to handle the error the following way ...

```typescript
const avgResult = average([1,2,3]);
console.log(avgResult instanceof EmptyArrayError ? "N/A" : (avg + 1))
```
This trick however will not protect the code from the problem of having something that is clearly not a number rendered in the user interface.

## Narrowed Type Approach

**If we do not want to throw or return an error at runtime, define the function in a way that it is impossible to call with arguments that introduce the error.** In math, you can define a domain of a function. It means that some functions do not have a sense for values that do not belong to the defined domain. TypeScript has an opportunity to make use of that concept too.

```typescript
export type NonEmptyArray<T> = [T, ...T[]];
```
This works analogously to the built-in `Array<T>` type. However, the difference is that it assures an array of a type T having at least one element.

```typescript
function average(numbers: NonEmptyArray<number>) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum / numbers.length;
}
```

When you test it, the happy path works like before ...

```typescript
console.log(average([5, 10, 15])) // 10
```
But, when you try the edge case ...

```typescript
console.log(average([]));
```

... we can clearly see that TypeScript protects us from writing code that does not make sense.

There is still one problem though, in the real project, these numbers will probably come from the outside of your app (user input, backend response, etc.). So the compiler cannot foresee if the array that you want to use will be empty or not. But what you can do to address this problem is to define a constructor function for our `NonEmptyArray` type ...

```typescript
export const nonEmptyArray = <T>(array: T[]): NonEmptyArray<T> | undefined => {
  if (array.length === 0) return undefined;
  return array as NonEmptyArray<T>;
}
```

Empty arrays have to be handled somehow. In such cases, return just `undefined` which is just a matter of taste what value to return.

Simulating the state where an array of numbers come from the world outside of the TypeScript application ...

```typescript
const someArrayFromJSON: number[] = JSON.parse("[1,2,3]");
```

Make use of the type constructor function as follows ...

```typescript
const someNonEmptyArray = nonEmptyArray(someArrayFromJSON);
```

It warns developers if they want to do this ...

This way, a developer that uses the library can be guided to implement the error handling as early as it could be ...

```typescript
console.log(someNonEmptyArray ? average(someNonEmptyArray) : "N/A");
```

At first glance, this pattern may look snippy. But in the long run, it protects the developers using the library from inconvenient debugging sessions on production.