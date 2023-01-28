package com.pluralsight.alarms;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Alarm alarm = new Alarm("Temperature too high.");
        alarm.turnOn();
        alarm.snooze();
        Thread.sleep(60000 * 6);
        alarm.sendReport();
    }
}