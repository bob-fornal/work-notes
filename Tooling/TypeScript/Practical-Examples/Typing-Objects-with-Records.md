# Typing Objects with Records

Given ...

```typescript
interface Person {
  [key: string]: unknown
}

const Human: Person = {
  name: 'Steve',
  age: 42,
};
```

While this is a valid solution to type an Object in TypeScript, it is pretty limited.

## Problem

For example, to allow certain keys try creating a string union like this ...

```typescript
type AllowedKeys = 'name' | 'age';

interface Person {
  [key: AllowedKeys]: unknown;
}

const Human: Person = {
  name: 'Steve',
  age: 42,
};
```

But, TypeScript does not like this and gives an error ...

> An index signature parameter type cannot be a literal type or generic type. Consider using a mapped object type instead.

## `Record` Approach

There is a solution which will make the code much more readable ...

```typescript
type AllowedKeys = 'name' | 'age';

type Person = Record<AllowedKeys, unknown>;

const Human: Person = {
  name: 'Steve',
  age: 42,
};
```

The code only had to change an interface into a type.
