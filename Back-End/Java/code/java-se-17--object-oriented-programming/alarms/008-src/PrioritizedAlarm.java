package com.pluralsight.alarms;

import java.awt.*;

public class PrioritizedAlarm extends Alarm {
    private final int priority;

    public PrioritizedAlarm(String message, int priority) {
        super(message);
        this.priority = priority;
    }

    @Override
    public Color getColor() {
        return Color.GREEN;
    }

    public int getPriority() {
        return priority;
    }
}
