# Java - Collections

What are collections?

## Data Structures

Can contain ...

* Ordering
* Pairs (key/value)
* Uniqueness

## Collections of Collections

* `List`: ordering of elements, each element has an index.
* `Set`/`SortedSet`: has uniqueness as a key property.
* `Queue`/`Deque`: elements, FIFO or FILO.
* `Map`/`SortedMap`: collection of pairs.

| Interfaces | Implementation |
|------------|----------------|
| Multiple data structures | Specific data structures |
| Functional characteristics | Performance characteristics |
| Prefer as variable type | Concrete and instantiable |
| Often has a popular implementation |  |

## Collection Implementations

* `List`: `ArrayList`, `LinkedList`.
* `Set`: `HashSet`.
* `SortedSet`: `TreeSet`.
* `Queue`: `PriorityQue`.
* `Deque`: `LinkedList`, `ArrayDeque`.
* `Map`: `HashMap`.
* `SortedMap`: `TreeMap`.

## Collection Behaviors

Collection extend the Iterable interface.

### Operations

| | |
|-|-|
| `size()` | Get the number of elements in the collection. |
| `isEmpty()` | `true` if `size() == 0`, `false` otherwise. |
| `add(element)` | Ensure that an element is in the collection. |
| `addAll(collection)` | Add all the elements of the argument collection to this collection. |
| `remove(element)` | Remove the element from this collection |
| `removeAll(collection)` | Remove all the elements of the argument collection from this collection. |
| `retainAll(collection)` | Remove all the elements of this collection not in the argument collection. |
| `contains(element)` | `true` if the element is in this collection, `false` otherwise. |
| `containsAll(collection)` | `true` if all the elements of the argument collection are in this collection. |
| `clear` | Remove all elements from this collection. |

## Lists: Collections with Iteration Order

### Features

Lists are collections with an iteration order.

Each element has an index.

```java
void add(int index, E element);
E get(int index);
E remove(int index);
E set(int index, E element);
boolean addAll(int index, Collection collection);
```

Look up indices by value;

```java
int indexOf(Object o);
int lastIndexOf(Object o);
```

Sublists are views over ranges of lists.

* Modifying the view modifies the list.

```java
List subList(int fromIndex, int toIndex);
```

Sorting

```java
list.sort(Comparator<? Super E> comparator)
```

List Static Factory Methods

* Creates unmodifiable List instances.
* Overloads for 0-10 arguments.
* Varargs constructor for more than 10 arguments.
* Creates and unmodifiable copy of an existing collection.

```java
List<E> of()
List<E> of(E e1)
List<E> of(E e1, E e2)

List<E> of(E ... elements)

List<E> copyOf(Collection<E>)
```

### Implementations

`ArrayList` is an implementation of a List.

Doubling Strategy versus incrementing an array by 1 as elements are added.

* Good, general purpose implementation.
* Use as default.
* CPU Cache Sympathetic.

`LinkedList` is a non-concurrent List (doubly-linked list).

* Worst performance in MOST cases.
* Use when adding elements at the start.
* Or when adding and removing elements a lot.

### Performance Comparison

|           | get() | add() | contains() | next() | remove() |
|-----------|-------|-------|------------|--------|----------|
| ArrayList | O(1) | O(N), $\Omega$(1) | O(N) | O(1) | O(N) |
| LinkedList | O(N) | O(1) | O(N) | O(1) | O(N) |

### Legacy Implementations

* `Vector` and `Stack`

## Maps

Maps are collections of Key/Value pairs.

### Map API

Map is the only collections that do not extend or implement the Collection interface.

| | |
|-|-|
| `V put(K key, V value)` | Adding and replacing in a map. |
| `void putAll(Map<? extends K, ? extends V> values)` | Buld update. |
| `V get(Object key)` | Looking up elements. |
| `boolean containsKey(Object key)`<br/> `boolean containsValue(Object value)` | Separate contains methods for key and value. |
| `V remove(Object key)` | Removing a key/value pair. |
| `int size()` | Querying size. |
| `boolean isEmpty()` | Is empty. |

Can create immutable Map Factories.

```java
// Individual key/value pairs
Map.Entry<String, Integer> entry = Map.entry("Richard", 38);
// Up to 10 value specific overload Factories
Map<String, Integer> personToAge = Map.of("Richard", 38);
// For greater than 10 varargs factory takes entry objects
personToAge = Map.ofEntries(Map.entry("Richard", 38));
// Immutable Copies of an existing Map
Map<String, Integer> copy = Map.copyOf(personToAge);
```

### Views over Maps

* `.keyset()`: Keys
* `.values()`: Values
* `.entrySet()`: Entries

### Advanced Operations

Altering and Removing

| | |
|-|-|
| `replace(key, value)` | Update a single value. |
| `replaceAll(BiFunction<K, V, V>)` | Replace elements using a function. |
| `remove(key, value)` | Remove a key ONLY if iti has a value. |

Updating

| | |
|-|-|
| `getOrDefault` | Returns a default if get has no value to return. |
| `computeIfAbsent` | Returns the value or calls the function if absent. |
| `putIfAbsent` | Puts a value if it isn't present already or the key is associated with `null`. |
| `computeIfPresent` | If the value exists, replace with computed value. |
| `compute` |  |
| `merge` | Takes a key/value and replaces with a function. |
| `forEach` | Iterates over key/value pairs with callback based iteration. |

### Implementations

General Purpose Implementations

| | |
|-|-|
| `HashMap` | Good general purpose implementation. |
| `TreeMap` | Defines sort order and adds functionality. |

#### `HashMap`

* Good general purpose implementation.
* Uses the `.hashCode()` method.
* Maintains an array of buckets.
* `rehash(hash) % bucket_count`
* Buckets are linked lists to accommodate collisions.
* Buckets can be trees.
* The number of buckets increases with more elements.

#### `TreeMaps`

* Comparator: Key elements have a sort order.
* Red / Black Tree: A balanced binary tree.
* Navigable & Sorted: Provides functionality that `HashMap` doesn't.

#### Performance Comparison

| | `put` | `get` | `containsKey` | `next` |
|-|-|-|-|-|
| `HashMap` | O(N), $\Omega$(1) | O(N), $\Omega$(1) | O(N), $\Omega$(1) | O(Capacity/N) |
| `TreeMap` | O(log(N)) | O(log(N)) | O(log(N)) | O(log(N)) |

### Special Purpose Implementations

`LinkedHashMap`

* **When**: Useful for implementing Size-based caches.
* Maintains Order: Either insertion or access.
* `removeEldestEntry`: Subclass and Override method in order to control cache.

`IdentityHashMap`

| `IdentityHashMap` | `HashMap` |
|-------------------|-----------|
| `System.identityHashCode()` | `obj.equals()` & `obj.hashCode()` |
| **Useful for Serialization or Graphs** | **Use normally** |
| Faster & Lower Memory | Avoids coupling Map to Keys |
| Low Collision Likelyhood | |
| Violates Map Contract | |

`WeakHashMap`

* **When**: Useful for a Memory Bounded Cache.
* Keys have weak references, can be collected if nothing else references them.
* Entries can be removed fater the key is collected.

`EnumMap`

* Keys are Enums: Faster and Low memory usage.
* Bitset Implementation: Only a single long if less than 64 elements.

## Java Streams

Abstraction that allows for processing changes over an entire Collection at once.

A stream is a way of supporting functional-style operations on Collections; aggregate operations that work on sequences of values.

* For loops and iterators are low-level and error prone constructs.

Example ...

```java
// This code is NOT using Streams
private static List<String> namesOfLightProductsWeightSortedLoop(List<Product> products) {
  List<Product> lightProducts = new ArrayList<>();

  for (Product product : products) {
    if (product.getWeight() < 30) {
      lightProducts.add(product);
    }
  }

  lightProducts.sort(comparingInt(Product::getWeight));

  List<String> productNames = new ArrayList<>();
  for (Product product : lightProducts) {
    productNames.add(product.getName());
  }

  return Collections.unmodifiableList(productNames);
}
```

```java
// This code is doing the same thing WITH Streams
private static List<String> namesOfLightProductsWeightSortedStreams(final List<Product> products) {
  return products
    .stream()
    .filter(product -> product.getWeight() < 30)
    .sorted(comparingInt(Product::getWeight))
    .map(Product::getName)
    .toList();
}
```

### Types of Stream Operations

* **Intermediate**: Everything but the last return `Stream <T>` (eg. `filter()`).
* **Terminal**: Last in the pipeline; return values (eg. `toList()`).

#### Intermediate Operations

| Operation | Description |
|-----------|-------------|
| `filter` | Remove element from the Stream that do not match a predicate.<br/>`streamOfProducts.filter(product -> product.getWeight() > 20)` |
| `map` | Transform elements from one value into another.<br/>`streamOfProducts.map(Product::getName)` |
| `skip` and `limit` | Discards / keeps elements respectively (pagination).<br/>SEE CODE <sup>1</sup> |
| `sorted` | Sort comparable objects with default order.<br/>`products.map(Product::getName).sorted()`<br/>SEE CODE <sup>2</sup> |
| `flatMap` | Transform elements from one value into zero, one or many values.<br>`streamOfShipments.flatMap(shipment -> shipment.getLightVanProducts().stream())` |

**CODE 1**
```java
streamOfProducts
  // Discard next N elements
  .skip(elementsOnPage * pageNumber)
  // Only keep next N elements
  .limit(elementsOnPage)
```

**CODE 2**
```java
products.map(Product::getName).sorted();

Comarator<Product> byName = Comparator.comparing(Product::getName);
products.sorted(byName);
```

#### Terminal Operations

Create containers ...

| Function | Description |
|----------|-------------|
| `productStream.toList();` | Creates a List with elements of the Stream.<br/>List is unmodifiable. |
| `productStream.toArray();` | Creates an Object[] Array. |
| `productStream.toArray(Product[]::new);` | Pass a function to create the specific array type.<br/> Normally used with method reference. |

Match family ...

* Terminal Operations
* Returns a Boolean
* If any/none/all elements match a Predicate.

```java
products.anyMatch(prod -> prod.getWeight() > 20);
products.noneMatch(prod -> prod.getWeight() > 20);
products.allMatch(prod -> prod.getWeight() > 20);
```

Minimum and maximum ...

```java
products.max(Comparator.comparingInt(Product::getWeight));
```

Side effects ...

```java
products.forEach(prod -> System.out.println(prod.getName()));
```

`findFirst` and `findAny` ...

```java
products.filter(prod -> prod.getName().contains("Chair")).findFirst();
```

Count the number of elements in a stream ...

```java
products.filter(prod -> prod.getName().contains("Chair")).count();
```

Reduce: Combine elements together using a combining function.

```java
streamOfProducts.reduce(0, (acc, product) -> acc + product.getWeight());
```

#### Collector

`collect` is a terminal operation.

```java
public static void main(String[] args) {
  var door = new Product(1, "Wooden Door", 35);
  var floorPanel = new Product(2, "Floor Panel", 25);
  var window = new Product(3, "Glass Window", 10);

  var products = List.of(
    door, floorPanel, window, floorPanel, window, floorPanel);
  
  var result = products
    .stream()
    .filter(product -> product.getWeight() < 30)
    .sorted(comparingInt(Product::getWeight))
    .toList();

  System.out.println("result = " + result);
}
```

```java
public static void main(String[] args) {
  var door = new Product(1, "Wooden Door", 35);
  var floorPanel = new Product(2, "Floor Panel", 25);
  var window = new Product(3, "Glass Window", 10);

  var products = List.of(
    door, floorPanel, window, floorPanel, window, floorPanel);
  
  var result = products
    .stream()
    .filter(product -> product.getWeight() < 30)
    .sorted(comparingInt(Product::getWeight))
    // .collect(Collectors.toList());
    // .collect(Collectors.groupingBy(Product::getName));
    // .collect(groupingBy(Product::getName, Collectors.toList()));
    .collect(groupingBy(Product::getName, counting()));

  System.out.println("result = " + result);
}
```

### Performance and Implementation

* Primitives versus Boxed Implementations (int versus Integer).
* Primitive Streams
* Parallel Streams

### Conclusion

Are Streams always better?

| Streams | Loops |
|---------|-------|
| High Level construct | Low level construct |
| Optimized framework | Can be faster |
| General better readability | Readability is subjective |
| Some edge cases are worse | Nicer with checked Exceptions |

## Collection Operations and Factories

* Factories: How to make unmodifiable, immutable, empty, or wrapping collections.
* Operations: Useful collection algorithms.

### Factory Methods

#### Empty Collections

**Immutable**

Use when you want to pass no values to a method that takes a collection.

```java
List<String> list = Collections.emptyList();
Map<Integer, String> map = Collections.emptyMap();
Set<Integer> set = Collections.emptySet();
```

#### Singletons

**Immutable single value of collection.**

Use when you want to pass a single value to a method that takes a collection.

```java
List<String> list = Collections.singletonList("one");
Map<Integer, String> map = Collections.singletonMap(1, "one");
Set<Integer> set = Collections.singleton(1);
```

#### Collection Factories

* Alternative to collection literals.
* Runtime immutable - add throws an exception.
* Overloads for performance.

```java
List<String> list = List.of("UK", "USA");

// Alternative Map
Map<String, Integer> map = Map.of("UK", 67, "USA", 328);

Map<String, Integer> entries =
  Map.ofEntries(
    Map.entry("UK", 67),
    Map.entry("USA", 328)
  );
```

#### Immutable Copies

```java
// Modifying countries does not modify immutableCountries
Collection<String> countries = new ArrayList();
countries.add("UK");
countries.add("USA");

List<String> immutableCountries = List.copyOf(countries);

Map<String, Integer> populations = new HashMap<>();
populations.put("UK", 67);
populations.put("USA", 328);

Map<String, Integer> immutablePopulations = Map.copyOf(populations);
```

#### Unmodifiable Views

```java
// Modifying countries is the only way to modify countriesView
List<String> countries = new ArrayList<>();
countries.add("UK");
countries.add("USA");

List<String> countriesView = Collections.unmodifiableList(countries);

Map<String, Integer> populations = new HashMap<>();
populations.put("UK", 67);
populations.put("USA", 328);

Map<String, Integer> populationsView = Collections.unmodifiableMap(populations);
```

## Collection Operations

### Disjoint

Disjoint means there are no common elements in the collection.

```java
var _1to3 = List.of(1, 2, 3);
var _2to4 = List.of(2, 3, 4);
var _4to6 = List.of(4, 5, 6);

System.out.println(Collections.disjoint(_1to3, _4to6)); // true
System.out.println(Collections.disjoint(_1to3, _2to4)); // false
```

### Frequency

Returns the number of elements within a collection equal to the object.

```java
var letters = "ABCDEFAADSEA".chars().mapToObject(x -> (char)x).toList();
int count = Collections.frequency(letters, 'A');
System.out.println(count); // 4
```

### Addall

Adds multiple elements to a collection.

```java
var door = new Product("Wooden Door", 35);
var floorPanel = new Product("Floor Panel", 25);
var window = new Product("Glass Window", 10);

var products = new ArrayList<Product>();
Collections.addAll(products, door, floorPanel, window);
```

### Max and Min

Find the maximum or minimum value in a collection based upon a comparator.

```java
var door = new Product("Wooden Door", 35);
var floorPanel = new Product("Floor Panel", 25);
var window = new Product("Glass Window", 10);

var products = List.of(door, floorPanel, window);
var max = Collections.max(products, Product.BY_WEIGHT);
System.out.println(max == door);
```

## Collections with Uniqueness: Sets

Sets are collections of distinct elements. There are no duplicates.

### Hashcode and Equals

> **Equality**: It can be reference-based or value-based. Reference-based just needs to inherit equals from Object. Value-based requres a custom equals method.

```java
// Combine hashcode information form each field
// Prime number times result, added to Hash Code
result = 31 * result + obj.hashCode();

// Arrays - reference-based Hash Code
Array.hashCode();

// Primitives (Java 8+) - returns a good value
Long.hashCode(longValue);
```

* IDE can auto-generate.
* Always use the same fields as `equals()`.

### Set Implementations

`HashSet`

* Based on `HashMap`: Uses `hashcode()` and looks up the location.
* Good General Purpose Implementation: Use by default.

`TreeSet`

* Base on `TreeMap`: Red/Black binary trees with defined sort order.
* Provides Extra Features: Implements `SortedSet` and `NavigableSet`.

Performancce Comparison

|           | `add` | `contains` | `next` |
|-----------| ------|------------|--------|
| `HashSet` | O(N), $\Omega$(1) | O(log(N)), $\Omega$(1) | O(Capacity/N) |
| `TreeSet` | O(log(N)) | O(log(N)) | O(log(N)) |

`LinkedHashSet`

* When: Copying Set to modify, Deduping List or Queue.
* Maintains Order: Only on insertion.
* Overhead: Slower than `HashSet`, less memory than `TreeSet`.

`EnumSet`

* Keys are Enums: Faster and lower memory usage.
* Bitset Implementation: Only a single long if less than 64 elements.

## `SortedSet` and `NavigableSet`

`SortedSet`

* Defines an order.
* No indexes, but subset views are possible.

```java
E first();
E last();

SortedSet tailSet(E fromElement);
SortedSet headSet(E toElement);
SortedSet subSet(E fromElement, E toElement);
```

`NavigableSet`

* Extends `SortedSet`.
* Provides means to move through the order.
* Implemented by `TreeSet`.

```java
E lower(E e); // elements lower
E higher(E e); // elements higher

E floor(E e); // return an element <= to
E ceiling(E e); // return an element >= to

E pollFirst(); // return first element from the set, removing it
E pollLast(); // return the last element from the set, removing it
```
