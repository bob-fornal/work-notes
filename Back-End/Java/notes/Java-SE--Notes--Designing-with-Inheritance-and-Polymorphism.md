# Java - Designing with Inheritance and Polymorphism

## Inheritance is About Upcasting

Inheritance is (mostly) about upcasting.

* Inheritance can be used to share code across classes.
* Delegation allows use of other classes for shared code.

## Do not Check for Types

Switching on type ...

* Hard to read and painful to update.

```java
public static boolean isAlarmUrgent(Alarm alarm) {
  if (alarm instanceof PrioritizedAlarm) {
    PrioritizedAlarm prioritizedAlarm = (PrioritizedAlarm)alarm;
    return prioritizedAlarm.getPriority() > 2;
  } else if (alarm instanceof HighVisibilityAlarm) {
    return true;
  } else if (alarm instanceof TimeSensitiveAlaram) {
    TimeSensitiveAlarm timeSensitiveAlarm = (TimeSensitiveAlarm)alarm;
    LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
    return timeSensitiveAlaram.getCreationTime().isAfter(oneHourAgo);
  } else
    return false;
}

... alternative ...

```java
// Alarm.java
public abstract boolean isUrgeng() {
  return false;
}

// HighVisibilityAlarm.java
@Override
public boolean isUrgent() {
  return true;
}

// TimeSensitiveAlarm.java
@Override
public boolean isUrgent() {
    LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
    return getCreationTime().isAfter(oneHourAgo);  
}

// PrioritizedAlarm.java
@Override
public boolean isUrgent() {
  return getPriority() > 2;
}
```
