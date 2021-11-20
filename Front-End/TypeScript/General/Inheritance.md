# Inheritance

A means for once class to share its member definition with one or more subclass.

## Extending Classes with Inheritance

```typescript
class Journal extends Item {
  constructor() {
    super(); // keyword that references parent
  }
}
```

## Abstract Classes

* Created with the `abstract` keyword.
* Base classes that may not be instantiated.
* (unlike interfaces) May contain implementation details.
* Abstract methods are not implemented.

```typescript
abstract class ReferenceItem {
  ...
  abstract printCitation(): void;
}
```