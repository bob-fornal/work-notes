package com.pluralsight.alarms;

public class Downcasting {

    public static void main(String[] args) {
        Alarm alarm = new PrioritizedAlarm("Hello World!", 42);

        // System.out.println(alarm.getPriority);
        if (alarm instanceof PrioritizedAlarm) {
            PrioritizedAlarm prioritizedAlarm = (PrioritizedAlarm)alarm;
            System.out.println(prioritizedAlarm.getPriority());
        }
    }
}
