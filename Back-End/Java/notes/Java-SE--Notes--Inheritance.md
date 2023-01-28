# Java - Inheritance

**Inheritance** and **polymorphism** tend to work together.

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