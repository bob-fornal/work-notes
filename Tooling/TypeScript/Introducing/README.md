## Introducing TypeScript to Teams

Adding value from day one.

## What is TypeScript?

TypeScript is a language for application-scale JavaScript development.

It is a typed superset of JavaScript used to add static typing and describe the
shapes of objects while working with JavaScript.

**SEE**: https://typescriptlang.org

It is an extremely popular choice among professional software teams building complex web, mobile, and desktop applications at scale.

Not all teams have been equally excited about it.

## How to get the Team Onboard

> Don't overdo it!

Experienced JavaScript developers are likely to appreciate some of the flexibility you get from the loosely-typed JavaScript.

There will be a lot of pushback trying to introduce (or even enforce) TypeScript used to its fullest capacity.

## Effective Use

The most effective use of TypeScript really boils down to the following ...

* Describe the shape of objects with interfaces
* Typing arguments and return values
* Use generics to generalize function signatures
* Use the TypeScript Utility Types

In particular, it is popular to describe the JSON response from an API using interfaces.

This part of TypeScript simply saves time and seems to be quite popular with everyone.

## Getting Started

It is simple! Add a file called `tsconfig.json` to the project, and start renaming the files to `.ts` instead of `.js`.

The tsconfig file is used to configure how the TypeScript transpiler works.
You should configure it to be *as little strict* as possible (to begin with).

In that way, JavaScript is allowed in the `.ts` files, thus, not introducing any extra work.

**SEE**: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

## Don't Be Annoying

Remember, there may be some skeptics on the team. Do not to confirm their idea that TypeScript is unnecessarily time-consuming to work with.

New TypeScript converts tend to insist on typing everything.

All functions must have a return type, all arguments must be typed, all variable declarations must be followed immediately by their type, and so on.

TypeScript is very good at inferring the types.

Do not trivially type out every single thing.

The team can keep writing the majority of the code as they are used to, and still get the benefits of the compiler warnings and errors when things are clearly not adding up.

## Add Value

Obviously, TypeScript is adding zero value here.

```typescript
const add = (n: any): any => {
  if (typeof n === 'number') return n + 1;
  return !!n;
}
```

I get it. If you’re new to TypeScript, some of the rather obscure compile-time errors can be confusing and feel like it’s slowing you down.

But if TypeScript is not adding any value - you are not going to convince anyone!
