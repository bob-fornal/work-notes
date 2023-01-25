# Java SE - Object-Oriented Programming (OOP)

## What is OOP?

* An application is built using objects. Each of these objects has data (fields) and opeations (methods).
* **ABSTRACTION**: Classes are a blueprint for an object.
* **ENCAPSULATION**: Interface are the externally visible parts. Implementation are internal functionality (hidden).
* **INHERITANCE**: Similar classes (subclasses).
* **POLYMORPHISM**: Many shapes; code varies depending on the overrides in objects.

## Working with Objects

```java
Alarm alarm = new Alarm("Temperature is too high.");
// alarm.active -> false
// alarm.message -> Temperature is too high.
// alarm.getReport(); -> ""
alarm.turnOn();
// alarm.active -> true
// alarm.getReport(); -> Temperature is too high.
```

When instantiated, Java returns a reference to the created object.

### Consequences

A reference might not have an object (`null`).

```java
Alarm a = null;
a.getReport(); // NullPointerException
```

Aliasing objects; the reference can be reassigned to another variable.

* Passing objects is another form of aliasing objects.

```java
Alarm alarm1 = new Alarm("");
// alarm1.active -> false
Alarm alarm2 = alarm1;
alarm2.turnOn();
// alarm2.active -> true
// alarm1.active -> true
```

### Identity and Equality

In some classes, `equals()` compares identity. In others, it compares equality.

```java
String s1 = "test string";
String s2 = "test string";
// s1 == s2 -> false
// s1.equals(s2) -> true
```

Two objects ...

* are *identical* if they are the same object in memory.
* are *equal* if they contain equal data.

The `==` operator checks for identity.

* `String` is a confusing special case.

The `equals()` method checks for ...

* (well), it depends on the class.

Primitives have only equality, no identity.

### Constants

`final` variables cannot be changed.

* Objects: The reference is a constant, but the instantiated constant is not.

```java
final int a = 10;
final Alarm alarm1 = new Alarm("");
// cannot set to null or another new alarm
// alarm.active -> false
alarm.turnOn();
// alarm.active -> true
```

* **Constant** - applies to variables, including object references. It means that the variable cannot be reassigned.
* **Immutable** - applies to objects. It means that the state of the object cannot be changed. Immutability is a design concept.

### Autoboxing / Autounboxing

Putting variables into a Collection. Each primitive type has a wrapper class.

```java
int aPrimitive = 42;
// myList.add(...);
myList.add(aPrimitive);
// Integer anObject = new Integer(aPrimitive);
// Integer anObject = aPrimitive;
// int anotherPrimitive = anObject;
// myList.add(anObject);
```
