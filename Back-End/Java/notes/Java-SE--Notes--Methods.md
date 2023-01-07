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

## Passing Objects as Parameters

* Passed "by reference."

```java
// Main.java
Flight val1 = new Flight(10);
Flight val2 = new Flight(20);
swapFlight(val1, val2);

static void swapFlight(Flight i, Flight j) {
  Flight k = i;
  i = j;
  j = k;
}


// Flight.java
public class Flight {
  private int flightNumber;
  
  public Flight(int flightNumber) {
    this.flightNumber = flightNumber;
  }

  // ...
}
```

## Changes to Object Parameters

Changes to members are visible outside the method.

```java
// Main.java
Flight val1 = new Flight(10);
Flight val2 = new Flight(20);
swapNumbers(val1, val2);

static void swapNumbers(Flight i, Flight j) {
  int k = i.getFlightNumber();
  i.setFlightNumber(j.getFlightNumber);
  j.setFlightNumber(k);
}
```

## Method Overloading

* Multiple versions of a method or constructor within a class.

Each constructor and method should have a unique signature.

* Number of parameters
* Type of each parameter
* Method name

```java
public class Passenger {
  public Passenger() {}
  public Passenger(int freeBags) { ... }
  public Passenger(double perBagFee) { ... }
  public Passenger(int freeBags, int checkedBags) { ... }

  // ...
}
```

Overloads used in methods does not have to be on the first line, as in the constructor.

```java
class Flight {
  int passengers, seats = 150, totalCheckedBags;

  public void add1Passenger() {
    if(hasSeating()) {
      passengers += 1;
    }
  }
  public void add1Passenger(int bags) {
    if(hasSeating()) {
      add1Passenger();
      totalCheckedBags += bags;
    }
  }
  public void add1Passenger(Passenger p) {
    add1Passenger(p.getCheckedBags());
  }
  public void add1Passenger(int bags, int carryOns) {
    if (carryOns <= 2)
      add1Passenger(bags);
  }
  public void add1Passenger(Passenger p, int carryOns) {
    add1Passenger(p.getCheckedBags(), carryOns);
  }

  private boolean hasSeating() {
    return passengers < seats;
  }

  // ...
}
```

Matching Method Calls

```java
// Main.java
Flight f = new Flight();

f.add1Passenger();
f.add1Passenger(2);

Passenger p1 = new Passenger(0, 1);
f.add1Passenger(p1)

Passenger p2 = new Passenger(0, 2);
f.add1Passenger(p2, 1);

short threeBags = 3;
f.add1Passenger(threeBags, 2); // type conversion

// Flight.java
class Flight {
  public void add1Passenger() { ... }
  public void add1Passenger(int bags) { ... }
  public void add1Passenger(Passenger p) { ... }
  public void add1Passenger(int bags, int carryOns) { ...}
  public void add1Passenger(Passenger p, int carryOns) { ... }
}
```

## Object Class and Methods

The Object Class is the root of the Java class hierarchy.

* An Object reference can reference an instance of any class.
* Every class has characteristics of an Object.

```java
// Main.java
Object[] stuff = new Object[3];
stuff[0] = new Flight(123);
stuff[1] = new MathEquation();
stuff[2] = " I like Java!";

Object o = "Just a String";
o = new Flight(456);

void doWork(Object o) {
  // do something with Object
  // having characteristics of o
}

Flight f = new Flight(123);
doWork(f);

Passenger p = new Passenger();
doWork(p);
```

| Method | Description |
|--------|-------------|
| `clone` | Create a new object instance that duplicates the current instance. |
| `hashCode` | Get a hash code for the current instance. |
| `getClass` | Return type information for the current instance. |
| `finalize` | Handle special resource cleanup scenarios. |
| `toString` | Returns a string value representing the current instance. |
| `equals` | Compare another object to the current instance for equality. |

## Overriding Object Equality

What does it mean to be equal?

```java
Flight f1 = new Flight(175);
Flight f2 = new Flight(175);

if (f1 == f2) // false
if (f1.equals(f2)) // same as ==, by default
```

```java
public class Flight {
  private int flightNumber;

  public boolean equals(Object o) {
    if (!(o instanceof Flight))
      return false;
    Flight flight = (Flight) o;
    return flightNumber == flight.flightNumber
  }

  // ...
}
```
