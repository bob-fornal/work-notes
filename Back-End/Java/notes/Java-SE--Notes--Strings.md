# Java Notes - Strings

## String Class

Stores a sequence of Unicode characters.

* Literals are enclosed in double quotes.
* Values can be concatenated using `+` and `+=`.

Strings are immutable.

* String variables do not directly hold the string value.
* String variables hold a reference to a string.
* Changes to the value create a new instance of the string.

```java
String name = "Bob";
String greeting = "Hello " + name;
System.out.println(greeting); // Hello Bob
greeting += " good to see you!";
System.out.println(greeting); // Hello Bob good to see you
```

## String Equality

Comparing strings with the equality operator (`==`).

* Checks to see if both string variables reference the same string instance.

Comparing strings with the `.equal` method.

* Character by character comparison.

```java
String s1 = "I love";
s1 += " Java";
String s2 = "I love";
s2 += " Java";
if (s1 == s2) // false
if (s1.equals(s2)) // true
```

### String Interning

* Provides a canonicalized value.
* Enables reliable `==` operator comparison.

```java
String s1 = "I love";
s1 += " Java";
String s2 = "I love";
s2 += " Java";
String s3 = s1.intern();
String s4 = s2.intern();
if (s3 == s3) // true
```

## String Methods

| Operation | Methods |
|-----------|---------|
| Length | `length` |
| Create new string(s) from existing | `concat`, `replace`, `loLowerCase`, `toUpperCase`, `trim`, `split` |
| Extract substring | `charAt`, `substring` |
| Text substring | `contains`, `endsWith`, `startsWith`, `indexOf`, `lastIndexOf` |
| Comparisons | `equals`, `equalsIgnoreCase`, `isEmpty`, `compareTo`, `compareToIgnoreCase` |
| Formatting | `format` |
| String for non-string | `valueOf` |

## String Converstion

Virtually all data types can be converted into a String.

* Can use `String.valueOf`.
* Conversion often happens implicitly.

```java
int iVal = 100;
String sVal = String.valueOf(iVal); // "100"

int i = 2, j = 3;
int result = i * j;
String output = i + " * " + j + " = " + result; // 2 * 3 = 6
```

## StringBuilder

Provides a mutable string buffer.

* Efficiently construct string values.
* Add new content to end with `append`.
* Add new content within with `insert`.

Extract content to a string

* Use `toString`.

```java
String location = "Florida";
int flightNumber = 175;

StringBuilder sb = new StringBuilder(40);
sb.append("I flew to ");
sb.append(location);
sb.append(" on Flight #");
sb.append(flightNumber);

String message = sb.toString; // "I flew to Florida on Flight #175"

String time = "9:00";
int pos = sb.indexOf(" on");
sb.insert(pos, " at ");
sb.insert(pos + 4, time);

message = sb.toString; // "I flew to Florida at 9:00 on Flight #175"
```
