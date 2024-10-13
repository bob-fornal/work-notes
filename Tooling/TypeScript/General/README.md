# TypeScript

* TypeScript is a superset of TypeScript
* Types add Safety
* Types enable faster development
* Compiles to JavaScript
* Cross-Platform
* Open Source

## TypeScript Basics

### Declaring Variables
(scoping rules)

* `var` = (HOISTED) globally available within the function in which it is declared.
* `let` = (not-hoisted) only available in the block in which it is declared.
* `const` (not-hoisted) only available in the block in which it is declared.

### Basic Types

* Boolean
* Number
* String
* Array
* Enum
* Any
* Void (absence of type)

### Type Inference

Based on usage.

### Adding Type Annotations

  : type

`const` identifier means the variable will not be changed to reference something completely different.

```typescript
const a = [ 1, 2, 3 ];
a = [];    // error
a.push(4); // valid

{ author: string }[] // array of objects
```

## Notes

* [Compiler Options and Project Configuration](Compiler-Options-and-Project-Configuration.md)
* [Enumerations](Enumerations.md)
* [Arrays](Arrays.md)
* [Functions](Functions.md)
* [Interfaces](Interfaces.md)
* [Classes](Classes.md)
* [Inheritance](Inheritance.md)
* [Modules and Namespaces](Modules-and-Namespaces.md)
* [Generics](Generics.md)
* [Destructuring Arrays and Objects](Destructuring-Arrays-and-Objects.md)
* [Union and Intersection Types](Union-and-Intersection-Types.md)
* [Type Guards](Type-Guards.md)
* [Freezing Objects](Freezing-Objects.md)
