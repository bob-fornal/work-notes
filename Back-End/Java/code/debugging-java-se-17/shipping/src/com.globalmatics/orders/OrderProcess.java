package com.globomatics.orders;

public class OrderProcess {

    // private int topSize = 3;
    private int minimumTopSize = 3;

    public static void main(String[] args) {
        String[] orderList = { "shirt", "pants", "shoes", "socks", "belt", "sweater", "gloves" };
        int topSize = 5;

        OrderProcess orderProcess = new OrderProcess();
        String[] topList = orderProcess.getTopOrders(orderList, topSize);

        for (String order: topList) {
            System.out.println(order);
        }
    }

    // public String[] getTopOrders(String[] orderList, int topsize) {
    public String[] getTopOrders(String[] orderList, int topSize) {
        String[] topOrders = new String[topSize];
        // for (int i = 1; i < topSize; i++) {
        for (int i = 0; i < topSize; i++) {
            topOrders[i] = orderList[i];
        }
        return topOrders;
    }
}
