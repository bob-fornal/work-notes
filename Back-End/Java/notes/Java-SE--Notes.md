# Java SE Notes

### Command Line Interface

```script
$ java Main
```

### Comments

```java
// ... Line Comment

/* Block Comment */

/** Javadoc Comment */
```

### Packages

Package names affect source-code organization.

Naming Conventions

* All lowercase
* Reverse domain name notation to assure global uniqueness.
* Further qualifiers to assure uniqueness within a company or group.

```java
package <name>
```

```script
$ java <name>.Main
```

## Language Features

### Lambdas

```java
Function<Integer, Integer> increment =
  (Integer value) -> value + 1;
```

* Represents functions without classes (methods).
* Pass functions to methods.
* Compose functions freely.

### Streams

```java
List
  .of(1,2,3,4)
  .stream()
  .filter(i -> i > 2)
  .map(increment)
  .toList();
  // [4, 5]
```

### Type Inference

```java
URL url = new URL("https://pluralsight.com");
URLConnection connection = url.openConnection();
BufferedInputStream inputStream = new BufferedInputStream(connection.getInputStream());
```

... to ...

```java
var url = new URL("https://pluralsight.com");
var connection = url.openConnection();
var inputStream = new BufferedInputStream(connection.getInputStream());
```

### Records

Data-only classes.

```java
record Product(String name, String vendor, int price, boolean inStock) {};
var peanutButter = new Product("Peanut Butter", "ACME", 400, true);
// Product[name=Peanut Butter, vendor=ACME, price=400, inStock=true]
```

## Language

* [Variables](./Java-SE--Notes--Variables.md)
