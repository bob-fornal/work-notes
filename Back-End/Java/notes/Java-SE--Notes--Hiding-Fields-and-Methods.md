# Hiding Fields and Methods

## Access Modifiers

* `public`: any code can access the field, method, or constructor.
* `private`: only code in the class has access.
* NOT `public` or `private`, "package-private."

```java
class Alarm {
  final String message;
  private boolean active;

  Alarm() { ... }
  Alarm(String message) { ... }

  public void turnOn() { ...}
  void turnOff() { ... }
  String getReport() { ... }
  String getReport(boolean uppercase) { ... }
  sendReport() { ... }
}
```

## The Second Pillar

Between interface and implementation, the implementation is usually easier to change.

**Encapsulation**

* Classes are easier to use. The interface is used, not the implementation.
* Classes are harder to misuse. Objects are protected from inconsistent changes.
* Classes are easier to change without breaking clients.
