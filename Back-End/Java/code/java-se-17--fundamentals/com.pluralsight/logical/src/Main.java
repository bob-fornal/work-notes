// package com.pluralsight.letsgetlogical;

public class Main {

    public static void main(String[] args) {
        int students = 150;
        int rooms = 0;

        // if (students / rooms > 30) - ERRORS if 0
        // if (rooms != 0 & students / rooms > 30) - ERRORS if 0
        if (rooms != 0 && students / rooms > 30)
            System.out.println("Crowded");

        System.out.println("");
        System.out.println("*** end of program ***");
    }
}