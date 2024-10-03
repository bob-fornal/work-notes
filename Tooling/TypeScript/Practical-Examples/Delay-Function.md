# Delay Function

## Problem

Defining a simple function to create a promise that is resolved with some delay ...

```typescript
export const delay = (timeInterval: number) =>
  new Promise(resolve => setTimeout(resolve, timeInterval));
```

For a programmer that knows JS by heart it might be pretty straightforward that such code will print “Hello” after 3 seconds ...

```typescript
delay(3000).then(() => { console.log("Hello"); });
```

... however ...

```typescript
delay(3).then(() => { console.log("Hello"); });
```
It is not 100% clear what units the delay function expects. We enforce the developer to remember what units they use and make room for ambiguities.

## Nomincal Types Approach

To clear up the ambiguities when it comes to units, the nominal-type features come to the rescue. However, at the moment of writing this article TypeScript has no native support for this feature. 

What is nominal-typing? In our context, we can treat it as a type that we would like to distinguish on a compiler level, even if it is similar or equivalent to other types. 

So, TypeScript doesn’t support nominal types, right? Well, that’s only partially true. It doesn’t natively, but there are a couple of options for simulating this feature.

```typescript
declare const NominalTypeSymbol: unique symbol;
export type TimeInterval = number & { [NominalTypeSymbol]: "TimeInterval" };
```

After introducing such type, you can define type constructors ...

```typescript
export const milliseconds = (howMany: number) => howMany as TimeInterval;
export const seconds = (howMany: number) => (howMany * 1000) as TimeInterval;
export const minutes = (howMany: number) => (howMany * 1000 * 60) as TimeInterval;
```

... and some helper functions that make it possible to convert this type back to a standard number type.

```typescript
export const toSeconds = (timeInterval: TimeInterval) => timeInterval / 1000;
export const toMilliseconds = (timeInterval: TimeInterval) => timeInterval as number;
```


Having these tools means the delay function can be rewritten so that it will no longer have a problem with time unit ambiguity.

```typescript
const delay = (timeInterval: TimeInterval) =>
  new Promise(resolve => setTimeout(resolve, toMilliseconds(timeInterval)));
```

So, the developer wanting to use it, cannot provide just a number. Instead, developers have to be explicit about the time unit.

```typescript
delay(seconds(3));
```

## Value Object Approach

Implementing code that works pretty much the same in the practice but is closer to the Object-Oriented paradigm ...

```typescript
export class TimeInterval {
  private constructor(private value: number) {}
 
  static milliseconds(howMany: number) {
    return new TimeInterval(howMany);
  }
 
  static seconds(howMany: number) {
    return new TimeInterval(howMany * 1000);
  }
 
  static minutes(howMany: number) {
    return new TimeInterval(howMany * 60_000);
  }
 
  toSeconds() {
    return this.value * 1000;
  }
 
  toMilliseconds() {
    return this.value;
  }
}
 
const delay = (timeInterval: TimeInterval) =>
  new Promise(resolve => setTimeout(resolve, timeInterval.toMilliseconds()));

delay(TimeInterval.seconds(3));
```

The only difference here is that at runtime a real object is passed that wraps the numeric value. In contrast, the nominal-type case has just a primitive number value under the hood. 
