# Java Notes - Looping and Arrays

Repeatedly execute a statement as long as the provided condition is `true`.

## While Loop

Condition is checked at the start of the loop, thus the loop body may never run.

```java
int someValue = 4;
int factorial = 1;
while (someValue > 1) {
  factorial *= someValue;
  someValue--;
}
System.out.println(factorial); // 24
```

## Do-While Loop

Condition is checked at the end of the loop, thus the loop body runs at least once.

```java
int iVal = 5;
do {
  System.out.print(iVal);
  system.out.print(" * 2 = ");
  iVal *= 2;
  System.out.println(iVal);
} while (iVal < 25);

// 5 * 2 = 10
// 10 * 2 = 20
// 20 * 2 = 40
```

## For Loop

Condition checked at loop start, thus loop body may never run.

* Simplified notation for loop control values.

```java
// while loop
int i = 1;
while (i < 100) {
  System.out.println(i);
  i *= 2;
}

//for-loop
for (int i = 1; i < 100; i *= 2)
  System.out.println(i);
```

## Arrays

Provide an ordered collection of elements.

* Each element is accessed via an index.
* Index is zero-based.
* Length is exposed.

```java
float[] theVals = new float[3];
theVals[0] = 10.0f;
theVals[1] = 20.0f;
theVals[2] = 15.0f;

float sum = 0.0f;

for(int index = 0; index < theVals.length; index++)
  sum += theVals[index];

System.out.println(sum); // 45.0
```

... array option ...

```java
float[] theVals = { 10.0f, 20.0f, 15.0f };
```

## For-Each Loop

Executes a statement once for each array member.

```java
float[] theVals = { 10.0f, 20.0f, 15.0f };
float sum = 0.0f;

for(float currentVal : theVals)
  sum += currentVal;

System.out.println(sum); // 45.0
```
