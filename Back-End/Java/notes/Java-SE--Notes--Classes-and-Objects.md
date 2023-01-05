# Java Notes - Classes and Objects

Java is an Object-Oriented Language.

## Declaring Classes

A Class is a template for creating objects.

* Declared with `class` keyword followed by the class name.
* Java source file name normally has the same name as the class.

```java
class Flight {
  // class members
}
```

## Class Members

Classes are made up of both state and executable code.

* **Fields** store object state.
* **Methods** are executable code that manupulates state and performs operations.
* **Constructors** are executable code that runs when an object is created.

```java
class Flight {
  int passengers;
  int seats;

  Flight() {
    seats = 150;
    passengers = 0;
  }

  void add1Passenger() {
    if (passengers < seats) {
      passengers += 1;
    }
  }
}
```

## Working with Objects

### Using Classes

Use the `new` keyword to create a class instance (a.k.a. an object).

* Allocates the memory described by the class and runs the constructor.
* Returns a reference to the allocated memory.

```java
Flight nycToLv;
nycToLv = new Flight();

Flight slcToSf = new Flight();

slcToSf.add1Passenger();
```

## Encapsulation and Access Modifiers

The implementation details of a class are generally hidden.

* This concept is known **encapsulation**.
* Java uses **access modifiers** to achieve encapsulation.

| Modifier | Visibility | Usable on Classes | Usable on Members |
|----------|------------|-------------------|-------------------|
| *No access modifier* | Only within its own package | Y | Y |
| `public` |  Everywhere | Y | Y |
| `private` |  Only within the declaring class | N* | Y |

* As `private` applies to top-level classes; `private` is available to nested classes.

```java
// Main.java
Flight flight1 = new Flight();
// System.out.println(flight1.passengers) ERROR
flight1.add1Passenger();

// Flight.java
public class Flight {
  private int passengers;
  private int seats;

  public Flight() { ... }
  public void add1Passenger() {
    if (passengers < seats)
      passengers += 1;
    else
    handleTooMany();
  }
  private void handleTooMany() {
    System.out.println("Too many");
  }
}
```

## Special References

`this` is an implicit reference to the current object

* Useful to reduce ambiguity.
* Allows an object to pass itself as a parameter.

```java
public class Flight {
  private int passengers;
  private int seats;
  ...
  public boolean hasRoom(Flight f2) {
    int total = this.passengers + f2.passengers;
    return total <= seats;
  }
}
```

`null` represents an uncreated object.

* Can be assigned to any reference variable.

```java
Flight lax1 = new Flight();
Flight lax2 = new Flight();
// add passengers to both flights
Flight lax3 = null;

if(lax1.hasRoom(lax2))
  lax3 = lax1.createNewWithBoth(lax2);

// other work
if(lax3 != null)
  System.out.println("Flights combined");
```

## Field Accessors and Mutators

In most cases the details should not be directly accessible outside the class.

* Use the accessor/mutator pattern to control field access.

1. **Accessor** retrieves the field value (also called *getter*).
2. **Mutator** modified the field value (also called *setter*).

```java
class Flight {
  private int seats;
  public int getSeats() {
    return seats;
  }
  public void setSeats(int seats) {
    this.seats = seats;
  }
}
```

## Default Initial State of Fields

When an object is created, it is expected to be in a useful state.

* Default initial state set by Java is often not enough.
* May need specific action to set field values and execute code.

| byte<br/>short<br/>int<br/>long | <br/><br/>float<br/>double | <br/><br/><br/>char | <br/><br/><br/>boolean | <br/><br/>Reference<br/>types |
|-|-|-|-|-|
| 0 | 0.0 | '\u0000' | `false` | `null` |

Establishing initial state.

1. Field initializer
2. Constructors
3. Initialization blocks

## Field Initializers

Specify a fields initial value as part of the fields declaration.

* Can be an equation.
* Can include other fields.
* Can include method calls.

```java
public class Earth {
  long circumferenceInMiles = 24901;
  long circumferenceInKilometers = Math.round(circumferenceInMiles * 1.6d);
}
```

## Constructors

Contains code that runs during object creation.

* Names same as the class
* No return type

```java
class Flight {
  private int passengers;
  private int seats = 150;
  // ...
}
```

Each class must have at least one constructor.

* When there is no explicit contructor, Java provides one.
* Can have multiple; each must have a unique parameter list.

```java
// Main.java
Passenger bob = new Passenger();
bob.setCheckedBags(3);

Passenger nia = new Passenger(2);

// Passenger.java
public class Passenger {
  private int checkedBags;
  private int freeBags;
  // getters and setters
  private double perBagFee;
  
  public Passenger() {}
  public Passenger(int freeBags) {
    this.freeBags = freeBags;
  }
}
```

## Chaining Constructors

One constructor can call another constructor.

* Must be first line of the constructor.
* Use the `this` keyword followed by a parameter list.

```java
public class Passenger {
  // ...
  public Passenger() {}
  public Passenger(int freeBags) {
    this(freeBags > 1 ? 25.0d : 50.0d);
    this.freeBags = freeBags;
  }
  public Passenger(int freeBags, int checkedBags) {
    this(freeBags);
    this.checkedBags = checkedBags.
  }
  public Passenger(double perBagFee) {
    this.perBagFee = perBagFee;
  }
}
```

## Constructor Visibility

Constructors can be non-public.

```java
// Main.java
// Passenger cheapJoe = new Passenger(0.01d);
Passenger geetha = new Passenger(2);
Passenger santiago = new Passenger(2, 3);

// Passenger.java
public class Passenger {
  // ...
  public Passenger() {}
  public Passenger(int freeBags) { ... }
  public Passenger(int freeBags, int checkedBags) { ... }
  // public Passenger(double perBagFee) { ... }
  private Passenger(double perBagFee) { ... }
}
```

## Initialization Blocks

Allow code to be shared across all constructors.

* Cannot receive parameters.
* Place code within brackets outside of any method or constructor.
* Does not replace the default constructor.

A class can have multiple Initialization Blocks.

* All blocks will always run from top to bottom.

```java
public class Flight {
  private int passengers, int seats = 150;
  private int flightNumber;
  private char flightClass;
  private boolean[] isSeatAvailable = new boolean[seats];

  {
    for(int i = 0; i < seats; i++) {
      isSeatAvailable[i] = true;
    }
  }

  public Flight(int flightNumber) {
    this.flightNumber = flightNumber;
  }
  public Flight(char flightClass) {
    this.flightClass = flightClass;
  }

  // ...
}
```

## Initialization and Construction Order

1. Field initializers
2. Intialization blocks
3. Constructors
