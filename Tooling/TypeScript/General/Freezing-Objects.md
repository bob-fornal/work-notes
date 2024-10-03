# Freezing Objects

Understand the difference in the semantics of `as const` and `Object.freeze` when working with TypeScript.

`Object.freeze` in TypeScript builds on top of the JavaScript semantics by returning an object of type `Readonly<T>`.

## `Object.freeze`

```typescript
const dev = Object.freeze({
  name: 'Bob',
  company: {
    name: 'LE'
  }
});

developer.name = 'Tim'; // Cannot assign to 'name' because it is a read-only property.ts
developer.company.name = 'MS';
```

## `as const`

```typescript
const dev = {
  name: 'Bob',
  company: {
    name: 'LE'
  }
} as const;

developer.name = 'Tim'; // Cannot assign to 'name' because it is a read-only property.ts
developer.company.name = 'MS'; // Cannot assign to 'name' because it is a read-only property.ts
```

|        | `Object.freeze` | `as const`            |
|--------|-----------------|-----------------------|
| Target | <center>**Object**</center> `Object.freeze` prevents from adding, removing, reconfiguring, editing properties and prevents the prototype from being changed. | <center>**Any literal value**</center> When applied to an object or array it makes them immutable (i.e. making them read-only). For other literals it prevents type widening. |
| Enforcement | <center>**Compile-time & run-time**</center> You can catch bugs without running the program if you do not cast to a different type. Even if you cast to `any`, you will get a runtime error. | <center>Compile-time</center> You can catch bugs without running the program if you do not cast to a different type. |
| Deep | <center>**No**</center> You will be able to reassign properties of nested objects. | <center>**Yes**</center> The compiler will not allow you to reassign properties of nested objects. |
| Prevents Configurability | <center>**Yes**</center> | <center>**No**</center> |
