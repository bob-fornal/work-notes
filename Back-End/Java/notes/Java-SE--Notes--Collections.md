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
