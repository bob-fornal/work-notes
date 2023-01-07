package com.pluralsight.calcengine;

public enum MathOperation {
    ADD('+'),
    SUBTRACT('-'),
    MULTIPLY('*'),
    DIVIDE('/');

    private char symbol;
    public char getSymbol() { return symbol; }
    MathOperation(char symbol) {
        this.symbol = symbol;
    }
}
