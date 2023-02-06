package com.monotonic.collections._2_what_are_collections.before;

import com.monotonic.collections.common.Product;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

public class CollectionConcepts
{
    public static void main(String[] args)
    {
        var door = new Product("Wooden Door", 35);
        var floorPanel = new Product("Floor Panel", 25);
        var window = new Product("Glass Window", 10);

        Collection<Product> products = new ArrayList<>();
        products.add(door);
        products.add(floorPanel);
        products.add(window);

        var toRemove = new ArrayList<Product>();
        toRemove.add(door);
        toRemove.add(floorPanel);

        products.removeAll(toRemove);

        System.out.println(toRemove);
        System.out.println(products);
    }
}
