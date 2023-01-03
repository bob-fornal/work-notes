# Java Notes - Methods

* Mechanism for organizing code.
* Enables creation of reusable code blocks.
* Can receive / return data.

## Declaring and Calling Methods

* Same rules and conventions as variables.
* Passing in a typed parameter list.

```java
System.out.println("Before method call");
doSomething();
System.out.println("After method call");

static void doSomething() {
  System.out.println("Inside method");
  System.out.println("Still inside");
}
```

## Parameters

* Variables are scope limited to method where they are declared.
* Parameters enabled passing data values to methods.

```java
showSum(7.5, 1.4, 3);

static void showSum(float x, float y, int count) {
  float sum = x + y;
  for (int i = 0; i < count; i++)
    System.out.println(sum);
}
```

### Parameter Passing Behavior

Parameters are passed "by value" ... a copy of the original value.

```java
int val1 = 10;
int val2 = 20;
swap(val1, val2);

System.out.println(val1); // 10
System.out.println(val2); // 20

static void swap(int i, int j) {
  int k = i;
  i = j; // 20
  j = k; // 10
}
```

## Exiting a Method

1. End of Method
2. Return Statement
3. Error Occurs (Throws an Exception)

```java
showSum(7.5, 1.4, 0);
System.out.println("Back from showSum");

static void showSum(float x, float y, int count) {
  if (count < 1)
    return;
  float sum = x + y;
  for (int i = 0; i < count; i++)
    System.out.println(sum);
  return;
}
```

## Returning a Value

Returning a simple value ...

```java
double result = calculateInterest(100d, 0.05d, 10);
System.out.println(result); // 50.0

static double calculateInterest(double amt, double rate, int years) {
  return amt * rate * years;
}
```

Returning an array ...

```java
static double[] produceInterestHistory(double amt, double rate, int years) {
  double[] accumulatedInterest = new double[years];
  for (int yearIndex = 0; yearIndex < years; yearIndex++) {
    int year = yearIndex + 1;
    accumulatedInterest[yearIndex] = calculateInterest(amt, rate, year);
  }
  return accumulatedInterest;
}
```

## Command-Line Arguments

Application `main` method, serves as an entry point.

```java
public static void main(String[] args) {
  if(args.length < 1)
    System.out.println("No args provided");
  else
    for(String arg : args)
      System.out.println(arg);
}
```
