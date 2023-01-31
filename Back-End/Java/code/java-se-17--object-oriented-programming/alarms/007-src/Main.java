package com.pluralsight.alarms;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Alarm alarm1 = new HighVisibilityAlarm("Temperature too high.");
        System.out.println(alarm1.getColor());
    }
}