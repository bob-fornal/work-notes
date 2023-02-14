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
