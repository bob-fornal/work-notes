package com.monotonic.collections._7_sets.after;

import com.monotonic.collections.common.Product;
import com.monotonic.collections.common.Supplier;

import java.util.*;

public class WeightAwareProductCatalogue implements Iterable<Product>
{
    private final NavigableSet<Product> products =
        new TreeSet<>(Product.BY_WEIGHT);

    public void addSupplier(final Supplier supplier)
    {
        products.addAll(supplier.getProducts());
    }

    public Set<Product> findLighterProducts(final Product product)
    {
        return products.headSet(product);
    }

    @Override
    public Iterator<Product> iterator()
    {
        return products.iterator();
    }
}
