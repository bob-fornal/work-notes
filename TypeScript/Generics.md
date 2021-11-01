# Generics

Code that works with multiple types.

* Accept "type parameters" for each instance or invocation.
* Apply to functions, interfaces, and classes.

## Type Parameters

* Specify the type of a generic will operate over.
* Listed separate from function parameters inside angle brackets.
* Conventionally represented by the letter 'T' (e.g. `Array<T>`).
* Actual type provided at instance creation or function invocation.

## Using `Array<T>`

```typescript
let poetryBooks: Book[];
let fictionBooks: Array<Book>;
let historyBooks: new Array<Book>(5);
```

* Type parameters specify the type the array can contain.
* Type parameters are part of the type.
* Type parameters are listed separate from function parameters.

## Generic Functions

```typescript
function LogAndReturn<T>(thing: T): T {
  console.log(thing);
  return thing;
}
let someString: string = LogAndReturn<string>('...');

let newMag: Magazine = { title: '...' };
let someMag: Magazine = LogAndReturn<Magazine>(newMag);
```

## Generic Interfaces

```typescript
interface Inventory<T> {
  getNewestItem: () => T;
  addItem: (newItem: T) => void;
  getAllItems: () => Array<T>;
}

let bookInventory: Inventory<Book>;
// populate inventory ...
let allBooks: Array<Book> = bookInventory.getAllItems();
```

## Generic Classes

```typescript
class Catalog<T> implements Inventory<T> {
  private catalogItems = new Array<T>();
  addItem(newItem: T) {
    this.catalogItems.push(newItem);
  }
  // implement other interface methods
}
let bookCatalog = new Catalog<Book>();
```

## Generic Constraints

* Describe types that may be passed as a generic parameter.
* `extends` keyword applies constraint.
* Only types satisfying the constraint may be used.

```typescript
interface CatalogItem {
  catalogNumber: number;
}

class Catalog<T extends CatalogItem> implements Inventory<T> {
  // implement interface methods ...
}
```