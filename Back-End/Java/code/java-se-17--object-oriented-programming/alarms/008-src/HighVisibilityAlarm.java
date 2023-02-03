package com.pluralsight.alarms;

import java.awt.*;

public class HighVisibilityAlarm extends Alarm {

    public HighVisibilityAlarm(String message) {
        super(message);
    }

    @Override
    public Color getColor() {
        return Color.ORANGE;
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
