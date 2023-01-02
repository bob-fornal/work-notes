# Java Notes - Variables

## Variables

Named data storage. Java is strongly typed.

* Variable Naming (letters and numbers, camel-case).

```java
int dataValue;
dataValue = 100;

int myInfo = 200;

final int maxStudents = 25;
```

`final` modifier: cannot be changed once set.

## Primitive Data Types

Built into the Java language and are the foundation of all other types. 

### Integer

```java
byte numberOfLetters = 26;
short feetInAMile = 5280;
int milesToSun = 92960000;
long milesInALightYear = 5879000000000L;
```

| Type | Bits | Minimum Value | Maximum Value | Literal Form |
|------|------|---------------|---------------|--------------|
| byte | 8 | -128 | 127 | O |
| short | 16 | -32,768 | 32,767 | O |
| int | 32 | -2,147,483,648 | 2,147,483,647 | O |
| long | 64 | -9,223,372,036,854,775,808 | 9,223,372,036,854,775,807 | OL |

### Floating point

```java
float kilometersInAMarathon = 42.195f;
float absoluteZeroInCelsius = -273.15f;
double atomicWidthInMeters = 0.0000000001d;
```

| Type | Bits | Minimum Value | Maximum Value | Literal Form |
|------|------|---------------|---------------|--------------|
| float | 32 | 1.4 x 10E-45 | 3.4 x 10E38 | O.Of |
| double | 64 | 4.9 x 10E-324 | 1.7 x 10E308 | O.O or O.Od |

### Character

Stores a single Unicode character.

```java
char regularU = 'U';
char accentedU = '\u00DA'; // Ú
```

### Boolean

Stores `true`/`false` values.

```java
boolean iLoveJava = true;
```

## Primitive Data Type Storage

Primitive types are stored by value (not be reference).

## Arithmetic Operators

### Basic Operators

| Operator | Operator | Floating Point | Integer |
|----------|----------|----------------|---------|
| Add | + | 1.0 + 2.0 = 3.0 | 1 + 2 = 3 |
| Subtract | - | 5.0 - 4.0 = 1.0 | 5 - 4 = 1 |
| Multiply | * | 4.0 * 2.0 = 8.0 | 4 * 2 = 8 |
| Divide | / | 13.0 / 5/0 = 2.6 | 13 / 5 = 2 |
| Modulus | % | 13.0 % 5.0 = 3.0 | 13 % 5 = 3 |

### Prefix and Postfix Operators

* `++` increments value by 1
* `--` decrements value by 1

```java
int someValue = 5;
System.out.println(++someValue); // returns 6
System.out.println(someValue); // returns 6

int someOtherValue = 5;
System.out.println(someOtherValue++); // returns 5
System.out.println(someOtherValue); // returns 6
```

### Compound Assignment Operators

* `+=`, `-=`, `*=`, `/=`, `%=`

```java
int myValue = 50;
myValue -= 5;
System.out.println(myValue); // 45
```

### Operator Precedence

1. Postfix operators (`n++`, `n--`)
2. Prefix operators (`++n`, `--n`)
3. Multiplicative operators (`*`, `/`, `%`)
4. Additive operators (`+`, `-`)

* Operators of equal precvedence are evaluated left-to-right.
* Can override precedence with parenthesis.
* Nested parenthesis evaluated from iside out.

## Data Type Conversions

### Implicit Type Conversion

* Conversion automatically performed by the compiler.

Widening conversions are performed automatically

* Mixed integer sizes.
* Mixed floating point sizes.
* Mixed integer and floating point.

```java
int intValueOne = 50;
long longValueOne = intValueOne;
```

### Explicit Type Conversion

* Conversion performed explicitly in code with cast operator.

Can perform widening or narrowing conversions. Be aware of potential **side effects**.

```java
long longValueTwo = 50;
int intValueTwo = (int) longValueTwo;
```

