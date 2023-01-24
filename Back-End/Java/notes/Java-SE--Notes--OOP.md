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
