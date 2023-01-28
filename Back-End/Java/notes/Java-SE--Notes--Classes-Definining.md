# Classes: Defining

Starting with client code ...

```java
Alarm alarm = new Alarm();
System.out.println(alarm.active); // false
alarm.turnOn();
System.out.println(alarm.active); // true
```

Alarm.java

```java
class Alarm {
  boolean active;

  void turnOn() {
    active = true;
  }
  void turnOff() {
    active = false;
  }
}
```

## Request for New Features

Add a message to alarms.

* The message describes what an alarm is about.

Add a method to get a report.

* The report describes the state of the alarm.
* If the alarm is active, the report is the alarm's message.
* If the alarm is inactive, the report is empty.
* Add an option to get the report in all uppercase.

Add a notification method.

* For now, just a placeholder that prints the report.
* It prints the uppercase version of the report.

Program.java

```java
Alarm alarm = new Alarm("The temperature is too high.");
alarm.turnOn();
alarm.sendReport(); // THE TEMPERATURE IS TOO HIGH.
```

Alarm.java

```java
class Alarm {
  boolean active;
  final String message;

  Alarm(String message) {
    this.message = message;
  }

  void turnOn() {
    active = true;
  }
  void turnOff() {
    active = false;
  }

  String getReport() {
    return getReport(false);
  }
  String getReport(boolean uppercase) {
    if (active) {
      if (uppercase)
        return message.toUpperCase();
      else
        return message;
    } else
      return "";
  }

  void sendReport() {
    System.out.println(getReport(true));
  }
}
```

## Constructors

A class can have multiple constructors as long as the signature is different.

```java
class Alarm {
  boolean active;
  final String message;

  Alarm() {
    this("Default message.");
  }
  Alarm(String message) {
    this.message = message;
  }

  void turnOn() { ...}
  void turnOff() { ... }
  String getReport() { ... }
  String getReport(boolean uppercase) { ... }
  sendReport() { ... }
}
```

## Destructors

Releases the object's resources (Java depends on Garbage Collection).

## The First Pillar

Abstraction: Besides primitive types, any other type can be created with classes.
