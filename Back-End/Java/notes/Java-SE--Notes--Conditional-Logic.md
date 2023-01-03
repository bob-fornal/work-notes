# Java Notes - Conditional Logic and Block Statements

## Relational Operators

| | Operator | Integer, Floating Point Example | Character Example | Boolean Example |
|-|----------|---------------------------------|-------------------|----------------|
| Greater than | > | 5 > 4 | 'c' > 'a' | n/a |
| Greater than or equal to | >= | 5 >= 4<br/>4 >= 4 | 'c' >= 'a'<br/> 'a' >= 'a' | n/a |
| Less than | < | 4 < 5 | 'a' < 'c' | n/a |
| Less than or equal to | <= | 4 <= 5<br/>4 <= 4 | 'a' <= 'c'<br/> 'a' <= 'a' | n/a |
| Equal to | == | 5 == 5 | 'c' == 'c' | true == true<br/>false == false |
| Not equal to | != | 4 != 5 | 'a' != 'c' | true != false |

## Conditional Assignment

Returns a value based on the result of a condition.

```java
// result = condition ? true-value : false-value;
int value1 = 7;
int value2 = 5;
int maxValue = value1 > value2 ? value1 : value2;
System.out.println(maxValue); // 7
```

## If-Else

```java
int value1 = 10;
int value2 = 4;
if (value1 > value2)
  System.out.println("value 1 is bigger");
else
  System.out.println("value 1 is not bigger");
```

## Chaining If-Else

```java
int value1 = 10;
int value2 = 40;
if (value1 > value2)
  System.out.println("value 1 is bigger");
else if (value1 < value2)
  System.out.println("value 2 is bigger");
else
  System.out.println("value 1 and value 2 are equal");
```

## Logical Operators

Produce a single `true` or `false` from two `true` or `false` values.

* May combine two relational tests.

```java
int a = 20, b = 14, c = 5;

if (a > b & b > c)
  System.out.println("a is greater than c");

boolean done = false;

if (!done)
  System.out.println("Keep going");
```

| | Operator | What Resolves to True |
|-|----------|-----------------------|
| And | & | `true` & `true` |
| Or | \| | `false` \| `true`, `true` \| `false` , `true` \| `true` |
| Exclusive or (XOR) | ^ | `false` ^ `true`, `true` ^ `false` |
| Negation | ! | `false` |

## Conditional Logical Operators

* Only executes the right-side of the condition when needed.

| | Operator | What Resolves to True |
|-|----------|-----------------------|
| And | && | executes right when left is `true` |
| Or | \|\| | executes right when left is `false` |

## Block Statements

Groups statements together, creating a compound statement.

* Enclosing statements in opening and closing brackets.

```java
int v1 = 10, v2 = 4;
final int diff;
if (v1 > v2) {
  diff = v1 - v2;
  System.out.println("v1 is bigger than v2, diff = " + diff);
}
else {
  diff = v2 - v1;
  System.out.println("v1 is not bigger than v2, diff = " + diff);
}
```

### Variable Scope

* Describes range of visibility.

```java
double students = 30.d, rooms = 4.0d;
if (rooms > 0.0d) {
  System.out.println(students);
  System.out.println(rooms);
  double avg = students / rooms;
  System.out.println(avg);
}
// System.out.println(avg); - not accessible here.
```

## Switch Statements

Test a value against multiple matches and transfer control based on a match.

* Primitives: `byte`, `short`, `int`, `long`, and `char`.
* A match can have multiple statements.
* End each match with a `break`; otherwise it will "fall through" to the next match.
