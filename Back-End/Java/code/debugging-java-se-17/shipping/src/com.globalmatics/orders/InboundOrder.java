package com.globomatics.orders;

import static com.globomatics.shipping.OutboundProcess.out;

public class InboundOrder {

    public static void main(String[] args) {
        InboundOrder testInboundOrder = new InboundOrder();
        String customerType = "gold";
        out("customer type: " + customerType);
        testInboundOrder.tagOrder(customerType);
    }

    public void tagOrder(String customerType) {
        // missing break;
        switch (customerType) {
            case "bronze":
                out("tag: Level 2");
                break;
            case "silver":
                out("tag: Level 3");
                break;
            case "gold":
                out("tag: Level 4");
                break;
            default:
                out("tag: Level 1");
                break;
        }
    }
}
