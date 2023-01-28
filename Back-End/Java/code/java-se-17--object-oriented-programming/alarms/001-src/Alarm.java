package com.pluralsight.alarms;

import java.time.LocalDateTime;

class Alarm {
    private boolean active;
    private final String message;
    private LocalDateTime snoozeUntil;

    Alarm(String message) {
        this.message = message;
        stopSnoozing();
    }

    void snooze() {
        if (active)
            snoozeUntil = LocalDateTime.now().plusMinutes(5);
    }
    void stopSnoozing() {
        snoozeUntil = LocalDateTime.now().minusSeconds(1);
    }

    boolean isSnoozing() {
        return snoozeUntil.isAfter(LocalDateTime.now());
    }

    String getMessage() {
        return message;
    }

    void turnOn() {
        active = true;
        stopSnoozing();
    }
    void turnOff() {
        active = false;
        stopSnoozing();
    }

    String getReport() {
        return getReport(false);
    }
    String getReport(boolean uppercase) {
        if (active && !isSnoozing()) {
            if (uppercase)
                return message.toUpperCase();
            else
                return message;
        } else
            return "";
    }

    void sendReport() {
        System.out.println(getReport(true));
    }
}
