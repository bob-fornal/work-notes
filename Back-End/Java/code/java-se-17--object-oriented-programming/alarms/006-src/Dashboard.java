package com.pluralsight.alarms;

import java.util.ArrayList;
import java.util.List;

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
