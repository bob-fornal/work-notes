# Functions

## Arrow Functions

Also called Anonymous Functions or Lambdas.

```typescript
arg => arg.book === 'Herman';
() => ({ });
() => { };
```

`this` is captured at function creation, not at invocation.

## Optional and Default Parameters

* Denoted with `?` after parameter name.
* Must appear after all required parameters.
* Default may be set to a literal value or an expression.

## Rest Parameters

"the rest" (remainder)

```typescript
function getBooks(name: string, ...bookIds: number[]) { }
```

* Collects a group of parameters into a single array.
* Denoted with an ellipsis prefix on last parameter.

## Overloaded Functions

* One symbol name.
* Multiple function types.
* One implementation with type guards.

```typescript
function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(property: any): string[] {
  if (typeof property === 'string') {
    // author
  } else if (typeof property === 'boolean') {
    // availability
  }
  return foundTitles;
}
```
