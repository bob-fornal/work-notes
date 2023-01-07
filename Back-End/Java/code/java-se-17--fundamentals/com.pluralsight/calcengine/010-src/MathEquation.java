package com.pluralsight.calcengine;

public class MathEquation {
    private double leftVal;
    private double rightVal;
    private char opCode;
    private double result;

    private static int numberOfCalculations;
    private static double sumOfResults;

    public MathEquation() {}
    public MathEquation(char opCode) {
        this.opCode = opCode;
    }
    public MathEquation(char opCode, double leftVal, double rightVal) {
        this(opCode);
        this.leftVal = leftVal;
        this.rightVal = rightVal;
    }

    public String toString() {
        char symbol = symbolFromOpCode();
        StringBuilder builder = new StringBuilder(20);
        builder.append(leftVal);
        builder.append(" ");
        builder.append(symbol);
        builder.append(" ");
        builder.append(rightVal);
        builder.append(" = ");
        builder.append(result);
        return builder.toString();
    }

    public void setLeftVal(double leftVal) {
        this.leftVal = leftVal;
    }
    public void setRightVal(double rightVal) {
        this.rightVal = rightVal;
    }
    public void setOpCode(char opCode) {
        this.opCode = opCode;
    }
    public double getResult() {
        return result;
    }

    public void execute() {
        switch (opCode) {
            case 'a':
                result = leftVal + rightVal;
                break;
            case 's':
                result = leftVal - rightVal;
                break;
            case 'm':
                result = leftVal * rightVal;
                break;
            case 'd':
                result = rightVal != 0 ? leftVal / rightVal : 0.0d;
                break;
            default:
                System.out.println("Invalid opCode: " + opCode);
                result = 0.0d;
        }

        numberOfCalculations++;
        sumOfResults += result;
    }
    public void execute(double leftVal, double rightVal) {
        this.leftVal = leftVal;
        this.rightVal = rightVal;
        execute();
    }
    public void execute(int leftVal, int rightVal) {
        this.leftVal = leftVal;
        this.rightVal = rightVal;
        execute();
        result = (int) result;
    }

    public char symbolFromOpCode() {
        char[] opCodes = { 'a', 's', 'm', 'd' };
        char[] symbols = { '+', '-', '*', '/' };
        char symbol = ' ';
        for(int index = 0; index < opCodes.length; index++) {
            if (opCode == opCodes[index]) {
                symbol = symbols[index];
            }
        }
        return symbol;
    }

    public static double getAverageResult() {
        return sumOfResults / numberOfCalculations;
    }
}
