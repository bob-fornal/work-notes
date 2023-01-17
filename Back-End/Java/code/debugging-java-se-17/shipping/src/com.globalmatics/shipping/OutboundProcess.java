package com.globomatics.shipping;

public class OutboundProcess {
    
    public static void main(String[] args) {
        OutboundProcess testOutboundProcess = new OutboundProcess();
        boolean freeShipping = false;
        out("free Shipping: " + freeShipping);
        testOutboundProcess.assignCarrier(freeShipping);
    }

    private void assignCarrier(boolean freeShipping) {
        // if (freeShipping = true) {
        if (freeShipping) {
            out("Use special carrier.");
        } else {
            out("Use regular carrier.");
        }
        recordShippingCharge(freeShipping);
    }

    private void recordShippingCharge(boolean freeShipping) {
        if (!freeShipping) {
            out("Add $5 shipping charge.");
        } else {
            out("No shipping charge.");
        }
    }

    public static void out(Object o) {
        System.out.println((o.toString()));
    }
}
