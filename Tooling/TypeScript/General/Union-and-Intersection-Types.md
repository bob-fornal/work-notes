# Union and Intersection Types

## Union Types

* Specify several valid types for a value.
* Vertical bar is used to separate valid types.

```typescript
function PI(id: string | number) {
  ...
}
```

## Intersection Types

* Specify a value that will contain all members of several types.
* Ampersand is used to separate included types.

```typescript
function CND(): Phone & Tablet {
  ...
}
```
