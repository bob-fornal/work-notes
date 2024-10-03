# Interfaces

* Contracts that define types.
* Compiler enforces the contracts via type checking.
* Collection of property and method definitions.

## Duck Typing

```typescript
interface Duck {
  walk: () => void;
  swim: () => void;
  quack: () => void;
}

let probablyADuck = {
  walk: () => console.log('...'),
  swim: () => console.log('...'),
  quack: () => console.log('...')
};

function FlyOverWater(bird: Duck) { }
FlyOverWater(probablyADuck); // works
```

## Defining an Interface

* `interface` keyword.
* List properties wtih their types.
* Optional properties denoted with `?`.
* Provide function signatures - no implementation.

## Interfaces for Function Types

```typescript
function createCustomerId(name: string, id: number): string {
  return name + id;
}

interface StringGenerator {
  (chars: string, nums: number): string;
}

let IdGenerator: StringGenerator;
IdGenerator = createCustomerId;
```

## Extending Interfaces

```typescript
interface LibraryResource {
  catalogNumber: number;
}
interface Book {
  title: string;
}
interface Encyclopedia extends LibraryResource, Book {
  volume: number;
}

let refBook: Encyclopedia = {
  catalogNumber: 1234,
  title: 'The Book Of Everything',
  volume: 1
};
```

