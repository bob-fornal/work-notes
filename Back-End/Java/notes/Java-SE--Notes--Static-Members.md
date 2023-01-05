# Java Notes - Static Members

Static members are shared class-wide.

* Not associated with an individual instance.
* Declared using the `static` keyword.
* Accessible using the class name.

## Static Fields

A value not associated with a specific instance.

```java
public class Flight {
  private int passengers, seats = 150;
  private static int allPassengers;

  public void add1Passenger() {
    if (passengers < seats) {
      passengers += 1;
      allPassengers += 1;
    }
  }

  // ...
}
```

## Static Methods

Performs an action not tied to a specific instance.

* Only has access to static members.

```java
// Main.java
Flight.resetAllPassengers();

Flight laxToSlc = new Flight();
laxToSlc.add1Passenger();
laxToSlc.add1Passenger();

Flight dwfToNyc = new Flight();
dwfToNyc.add1Passenger();

System.out.println(laxToSlc.getPassengers()); // 2
System.out.println(dwfToNyc.getPassengers()); // 1
System.out.println(Flight.getAllPassengers()); // 3

// Flight.java
public class Flight {
  private int passengers, seats = 150;
  private static int allPassengers;

  public static int getAllPassengers() {
    return allPassengers;
  }

  public static void resetAllPassengers() {
    allPassengers = 0;
  }

  // ...
}
```

## Static Import Statement

Import statement

* Allows a type name to be used without being package-qualified.

Static Import Statement

* Used with static methods.
* Allows method name to be used without being class-qualified.

```java
// Main.java
import static com.pluralsight.flightapp.Flight.*;
// import static com.pluralsight.flightapp.Flight.resetAllPassengers;
// import static com.pluralsight.flightapp.Flight.getAllPassengers;

// Flight.resetAllPassengers();
resetAllPassengers();

Flight laxToSlc = new Flight();
laxToSlc.add1Passenger();
laxToSlc.add1Passenger();

Flight dwfToNyc = new Flight();
dwfToNyc.add1Passenger();

// System.out.println(Flight.getAllPassengers()); // 3
System.out.println(getAllPassengers()); // 3
```

## Static Initialization Block

Perform one-time type initialization.

* Executes before the types first use.
* Has access to static members only.

Statements enclosed in brackets.

* Preceded by `static` keyword.
* Outside of any method or constructor.

```java
// Flight.java
public class Flight {
  private int passengers, seats = 150;
  private static int allPassengers, maxPassengersPerFlight;

  static {
    AdminService admin = new AdminService();
    admin.connect();
    maxPassengersPerFlight = admin.isRestricted()
      ? admin.getMaxFlightPassengers()
      : Integer.MAX_VALUE;
    admin.close();
  }

  public void add1Passenger() {
    if(passengers < seats && passengers < maxPassengersPerFlight) {
      passengers += 1;
      allPassengers += 1;
    }
  }

  // ...
}
```
