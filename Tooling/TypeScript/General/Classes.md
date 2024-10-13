# Classes

* Template for creating objects.
* Provide state storage and behavior.
* Encapsulate reusable functionality.

## Class Types

```typescript
interface Librarian {
  doWork: () => void;
}

class ElementarySchoolLibrarian implements Librarian {
  doWork() {
    console.log('...');
  }
}

let kidsLibrarian: Librarian = new ElementarySchoolLibrarian();
kidsLibrarian.doWork();
```

## Constructors

Method named `constructor` - maximum of one per class.

* Use optional parameters to call in different ways.
* Executed (creating an instance) by using the `new` keyword.

## Properties and Methods

* Property: Variable Definition
* Property: Getting and setter (`get` / `set`)
* Methods: Functions defined inside the class.

## Static Properties

`static` prefix; stored on the class, not a specific instance.

## Access Modifiers

* (`public`) by default.
* `private` inside the class.
* `protected` inside the class and subclasses.
