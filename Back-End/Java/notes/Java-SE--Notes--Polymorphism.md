# Java - Polymorphism

## References

A reference can be **upcast** ...

```java
Prioritized alarm1 = new PrioritizedAlarm("Pressure low", 1);
Alarm alarm2 = new PrioritizedAlarm("Pressure low", 1);
```

## Polymorphism

Polymorphic code can take different shapes; can do different things.

```java
public class Dashboard {
    private final List<Alarm> allAlarms = new ArrayList<>();

    public void add(Alarm alarm) {
        alarm.turnOn();
        allAlarms.add(alarm);
    }

    public void printBigReport() {
        for (Alarm alarm : allAlarms)
            System.out.println(alarm.getReport(true));
    }

    public static void main(String[] args) {
        Dashboard dashboard = new Dashboard();

        dashboard.add(new PrioritizedAlarm("Temperature too high", 42));
        dashboard.add(new HighVisibilityAlarm("Pressure too low"));
        dashboard.add(new TimeSensitiveAlarm("Never mind the other alarms. You're late for dinner"));

        dashboard.printBigReport();
    }
}
```

## Downcasing

* Be sure of the object type; check that dowencasting is valid.
* Avoid downcasting altogether.
* Use `instanceof` to check type first.


```java
Alarm alarm = new PrioritizedAlarm("Hello World!", 42);
// System.out.println(alarm.getPriority);

if (alarm instanceof PrioritizedAlarm) {
  PrioritizedAlarm prioritizedAlarm = (PrioritizedAlarm)alarm;
  System.out.println(prioritizedAlarm.getPriority());
}
```
