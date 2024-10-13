# Destructuring Array and Objects

## Destructuring Assignment

The process of assigning the elements of an array or the properties of an object into individual variables.

```typescript
let medals: string[] = [ 'gold', 'silver', 'bronze' ];
let [ first, second, third ] = medals;

let person = {
  name: 'Audrey',
  address: '123 Main Street',
  phone: '555-1212'
};
let { name, address, phone } = person;
```

## Spread Operator

```typescript
let newBookIds = [ 10, 20 ];
let allBookIds = [ 1, 2, 3, ...newBookIds ];

let bookIdList = [];
bookIdList.push(...allBookIds);
```

## Tuple Types

A tuple type combines a set of numerically named properties with the members of an array type.

* Extension to Array
* Type of a fixed number of elements is specified.
* May contain different types.

```typescript
let myTuple: [ number, string ] = [ 10, '...' ];
```
