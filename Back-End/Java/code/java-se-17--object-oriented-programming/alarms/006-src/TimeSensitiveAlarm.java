package com.pluralsight.alarms;

import java.time.LocalTime;

public class TimeSensitiveAlarm extends Alarm {
  public TimeSensitiveAlarm(String message) {
    super(message);
  }

  @Override
  public String getReport(boolean uppercase) {
    String report = super.getReport(uppercase);
    if (report.isEmpty())
      return report;
    else
      return LocalTime.now() + ": " + report;
  }
}