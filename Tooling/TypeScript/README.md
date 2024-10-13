# TypeScript

> TypeScript allows a developer to better express their intent to other developers. - Eric Potter

## Developer Notes

* [Getting Started with TypeScript](./Getting-Started/README.md)
* [Introducing TypeScript](./Introducing/README.md)
* [Migrating from JavaScript to TypeScript](./Migrating/README.md)
* [Practical Examples](./Practical-Examples/README.md)
* [TypeScript](./General/README.md)
* [Why Use TypeScript](./Why-Use/README.md)
* [Deep TypeScript Tips & Tricks](./Deep-TypeScript-Tips-&-Tricks/README.md/)

## Articles

* [TypeScript Generics: What's with the Angle Brackets `<>`?](https://javascript.plainenglish.io/typescript-generics-whats-with-the-angle-brackets-4e242c567269) ![Link](../../foreign.png)
* [Toxic Optionals](https://dev.to/latobibor/toxic-optionals-typescript-55bj) ![Link](../../foreign.png)

## Patterns

```typescript
import type { KeysOfUnion, Simplify } from "type-fest"

type UnionOptionalInner<BaseType extends object, EveryKey extends KeysOfUnion<BaseType> = KeysOfUnion<BaseType>> = Simplify<
  // 1. For each member of the union (Note: `T extends any` is distributive)
  BaseType extends object
    ? (
        // 2. Preserve the original type
        & BaseType 
        // 3. And map other keys to `{ key?: undefined }`
        & { [K in Exclude<EveryKey, keyof BaseType>]?: undefined }
      )
    : never
>

type UnionOptional<BaseType extends object> = UnionOptionalInner<BaseType>

type Auth = UnionOptional<{ token: string, key: string } | { key: Uint8Array } | { cert: Uint8Array }>

function bytesFromAuth(auth: Auth): Uint8Array {
  if (auth.token != null) {
  	return new TextEncoder().encode(auth.token)
  } else if (auth.key != null) {
	  return auth.key
  } else {
    return auth.cert
  }
}
```
