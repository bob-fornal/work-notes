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
