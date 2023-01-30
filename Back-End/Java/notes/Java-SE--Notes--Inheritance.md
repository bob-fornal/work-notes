# Java - Inheritance

**Inheritance** and **polymorphism** tend to work together.

* Single Rooted Hierarchy: All classes that do not `extend` are a subclass of `Object`.

## Adding a priority feature.

```java
class Alarm {
  private final String message;
  private boolean active;
  private LocalDateTime snoozeUntil;

  public Alarm(String message) { ... }

  public void snooze() { ... }
  private void stopSnoozing() { ... }
  public boolean isSnoozing() { ... }
  public String getMessage() { ... }
  public void turnOn() { ...}
  public void turnOff() { ... }
  public String getReport() { ... }
  public String getReport(boolean uppercase) { ... }
  public sendReport() { ... }
}

public class PrioritizedAlarm extends Alarm {
  private final int priority;

  public PrioritizedAlarm(String message, int priority) {
    super(message);
    this.priority = priority;
  }

  public int getPriority() {
    return priority;
  }
}
```

## Overriding Methods

```java
class Alarm {
  protected final String message;
  private boolean active;
  private LocalDateTime snoozeUntil;

  public Alarm(String message) { ... }

  public void snooze() { ... }
  private void stopSnoozing() { ... }
  public boolean isSnoozing() { ... }
  public String getMessage() { ... }
  public void turnOn() { ...}
  public void turnOff() { ... }
  public String getReport() { ... }
  public String getReport(boolean uppercase) { ... }
  public sendReport() { ... }
}

public class HighVisibilityAlarm extends Alarm {

  public HighVisibilityAlarm(String message) {
    super(message);
  }

  @Override
  public String getReport(boolean uppercase) {
    String report = super.getReport(uppercase);
    if (report.isEmpty())
      return report;
    else
      return report + "!";
  }
}

```

## `final` Keyword

* Variables and fields: It cannot be reassigned.
* Methods: It cannot be overriden.
* Classes: It cannot be inherited.

A method called by a `constructor` should be either *`private`* or *`final`*.

## Sealed Classes

The hierarchy becomes locked.
