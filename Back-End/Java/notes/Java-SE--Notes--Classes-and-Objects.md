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
