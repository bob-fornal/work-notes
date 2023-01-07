# Java Notes - Wrapper Classes, Enums, and Records

## Primitive Wrapper Classes

* Can hold primitive data values.
* Provide methods.
* Enable compatibility with richer aspects of the Java type system.

Methods handle common operations

* Converting to/from other types.
* Extractive values from strings.
* Finding min/max values.
* more ...

```java
int valA = 10; // value
Integer valB = 20; // reference
Integer valC = valA; // boxing
int valD = valB; // unboxing
```

### Boxing

* Convert from primitive type to a wrapper class.

### Unboxing

* Convert from a wrapper class to a primitive type.

## Role of Enum Types

Useful for defining a type with a finite list of values.

* Declare using the `enum` keyword.
* Provide a comma-separated value list.
* By convention value names are all uppercase.

```java
public enum FlightCrewJob {
  FLIGHT_ATTENDANT,
  COPILOT,
  PILOT
}
```

## Conditional Logic with Enums

Enums support equality tests.

* Can use `==` and`!-` operators.

Enums support `switch` statements.

```java
FlightCrewJob job1 = FlightCrewJob.PILOT;
FlightCrewJob job2 = FlightCrewJob.FLIGHT_ATTENDANT;

if(job1 == FlightCrewJob.PILOT)
  System.out.println("job1 is PILOT");
if(job1 != job2)
  System.out.println("job1 and job2 are different");

void displayJobResponsibilities(FlightCrewJob job) {
  switch(job) {
    case FLIGHT_ATTENDANT:
      System.out.println("Assures passenger safety.");
      break;
    case
      System.out.println("Assists in flying the plane.");
      break;
    case
      System.out.println("Flies the plane.");
      break;
  }
}
```

## Relative Comparisons

Values are ordered.

* First value is lowest.
* Last value is highest.

Use `compareTo` for relative comparison.

* Returns negative, zero, or positive value. This indicates the current instance's ordering relative to another value.

```java
// FlightCrewJob.java
public enum FlightCrewJob {
  FLIGHT_ATTENDANT,
  COPILOT,
  PILOT
}

// CrewMember.java
class CrewMember {
  FlightCrewJob job;
  String name;
  CrewMember(FlightCrewJob job, String name) {
    this.job = job;
    this.name = name;
  }
}

// Main.java
CrewMember geetha = new CrewMember(FlightCrewJob.PILOT, "Geetha");
CrewMember bob = new CrewMember(FlightCrewJob.PILOT, "Bob");
whoIsInCharge(geetha, bob);

void whoIsInCharge(CrewMember member1, CrewMember member2) {
  CrewMember theBoss = member1.getJob().compareTo(member2.getJob()) > 0
    ? member1
    : member2;;
  System.out.println(theBoss.getName() + " is the boss."); // Geetha is the boss.
}
```

| Method | Description |
|--------|-------------|
| `values` | Returns an array containing all values. |
| `valueOf` | Returns the value taht corresponds to a string (case sensitive) |

## Using Class-based features of Enums

Enum Types are Classes.

* Implicitly inherit from Java's Enum class.

Enum Types can have members.

* Fields
* Methods
* Constructors

Enum Values

* Each value is actually an instance of the enum type.
* Declaring the value creates the instance.
* Can leverage the enum type's constructor.

```java
// FlightCrewJob.java
public enum FlightCrewJob {
  FLIGHT_ATTENDANT("Flight Attendant"),
  COPILOT("First Officer"),
  PILOT("Captain");

  private String title;
  public string getTitle() { return title; }
  private FlightCrewJob(String title) {
    this.title = title;
  }
}

// Main.java
CrewMember geetha = new CrewMember(FlightCrewJob.PILOT, "Geetha");
CrewMember bob = new CrewMember(FlightCrewJob.PILOT, "Bob");
whoIsInCharge(geetha, bob);

void whoIsInCharge(CrewMember member1, CrewMember member2) {
  CrewMember theBoss = member1.getJob().compareTo(member2.getJob()) > 0
    ? member1
    : member2;;
  System.out.println(theBoss.getJob().getTitle() + " " +
    theBoss.getName() + " is the boss."); // Captain Geetha is the boss.
}

```

## Records

Some classes serve only as data carriers.

* Initialize with required data values.
* Those values never really change.

Often involve a lot of "boilerplate" code.

* Constructor to initialize fields.
* Getters for each instance field.
* Common methods such as `equals`, `hashCode`, and `toString`.

```java
public class Passenger {
  private String name;
  private int checkedBags;

  public Passenger(String name, int checkedBags) {
    this.name = name;
    this.checkedBags = checkedBags;
  }

  public String getName() { return name; }
  public int getCheckedBags() { return checkedBags; }

  public boolean equals(Object o) { ... }
  public int hashCode() { ... }
  public String toString() { ... }
}
```

### Record

Simplifies creating data-only classes.

* Declared using the `record` keyword.
* Created class is immutable.

Automatically generates common code.

* Constructor to initialize instance fields.
* Getters for each instance field.
* `equals`, `hasdCode`, and `toString` methods.

```java
// Passenger.java
public record Passenger(String name, int checkedBags) { }

// Main.java
Passenger p1 = new Passenger("Bob", 2);
String n = p1.name();
int b = p1.checkedBags();

Passenger p2 = new Passenger("Maria", 1);

if(p1.equals(p2))
  // do something
```
