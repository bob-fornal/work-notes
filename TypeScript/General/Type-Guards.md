# Type Guards

## `typeof` Type Guard

* Uses JavaScript `typeof` operator.
* Compares result of `typeof` operator to a type name.
* Type name may only be `string`, `number`, `boolean`, or `symbol`.

## `instanceof` Type Guard

* Generally used with classes.

## User-Defined Type Guards

```typescript
function isBook(text: Book | Magazine): text is Book {
  return (<Book>text).author !== undefined;
}

let readingMaterial: Book | Magazine;

if (isBook(readingMaterial)) {
  ...
} else {
  ...
}
```
