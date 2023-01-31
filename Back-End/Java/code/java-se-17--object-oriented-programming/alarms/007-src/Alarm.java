package com.pluralsight.alarms;

import java.time.LocalDateTime;
import java.awt.Color;

public abstract class Alarm {
    protected boolean active;
    private final String message;
    private LocalDateTime snoozeUntil;

    public Alarm(String message) {
        this.message = message;
        stopSnoozing();
    }

    public abstract Color getColor();

    public LocalDateTime getSnoozeUntil() {
        return snoozeUntil;
    }

    @Override
    public String toString() {
        return getReport();
    }

    public void snooze() {
        if (active)
            snoozeUntil = LocalDateTime.now().plusMinutes(5);
    }
    private void stopSnoozing() {
        snoozeUntil = LocalDateTime.now().minusSeconds(1);
    }

    public boolean isSnoozing() {
        return snoozeUntil.isAfter(LocalDateTime.now());
    }

    public String getMessage() {
        return message;
    }

    public void turnOn() {
        active = true;
        stopSnoozing();
    }
    public void turnOff() {
        active = false;
        stopSnoozing();
    }

    public String getReport() {
        return getReport(false);
    }
    public String getReport(boolean uppercase) {
        if (active && !isSnoozing()) {
            if (uppercase)
                return message.toUpperCase();
            else
                return message;
        } else
            return "";
    }

    public void sendReport() {
        System.out.println(getReport(true));
    }
}
