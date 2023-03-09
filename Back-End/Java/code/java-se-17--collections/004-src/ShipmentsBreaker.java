package com.monotonic.collections._6_operations.after;

import com.monotonic.collections.common.Product;

import java.util.List;

public class ShipmentsBreaker
{
    public static Product door = new Product("Wooden Door", 35);
    public static Product floorPanel = new Product("Floor Panel", 25);
    public static Product window = new Product("Glass Window", 10);

    public static void main(String[] args)
    {
        var shipment = new Shipment();

        shipment.add(door);
        shipment.add(window);
        shipment.add(door);
        shipment.add(window);
        shipment.add(floorPanel);

        shipment.prepare();

        var lightVanProducts = shipment.getLightVanProducts();
        System.out.println("lightVanProducts = " + lightVanProducts);

        lightVanProducts.remove(window);

        System.out.println("shipment = " + shipment.getLightVanProducts());
        shipment.forEach(System.out::println);
    }
}
