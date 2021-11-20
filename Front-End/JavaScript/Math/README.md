# Math

## Constants

JavaScript has 8 mathematical constants that can be accessed as the Math object's properties.

```javascript
Math.PI       // returns the value of PI
Math.E        // returns Euler's number
Math.SQRT2    // returns the square root of 2
Math.SQRT1_2  // returns the square root of 1/2
Math.LOG2E    // returns base 2 log of E
Math.LOG10E   // returns base 10 log of E
Math.LN2      // returns the natural log of 2
Math.LN10     // returns the natural log of 10
```

## `Math.random()`

Returns a float between the range 0 to less than 1 (inclusive of 0, but not 1).

```javascript
Math.random(); // 0.13145521803082083
Math.random(); // 0.5683973350469758
Math.random(); // 0.5533432054850067
```

## `Math.floor()`

Takes in a number as the argument and returns the number rounded down to its nearest integer.

```javascript
Math.floor(3.14);     // returns 3
Math.floor(9.999999); // returns 9
Math.floor(4.000001); // returns 4
```

## `Math.ceil()`

Takes in a number as the argument and returns the number rounded up to its nearest integer.

```javascript
Math.floor(3.14);     // returns 4
Math.floor(9.999999); // returns 10
Math.floor(4.000001); // returns 5
```

## `Math.round()`

Takes in a number as the argument and returns the number rounded off to its nearest integer.

```javascript
Math.round(3.14);     // returns 3
Math.round(9.999999); // returns 10
Math.round(4.000001); // returns 4
```

## `Math.sqrt()`

Takes in a number as the argument and returns its square root.

```javascript
Math.sqrt(25); // 5;
Math.sqrt(10); //3.1622776601683795
Math.sqrt(26); //5.0990195135927845
```

## `Math.pow()`

Takes in two numbers as arguments and squares the first number to the power of the second number.

```javascript
Math.pow(2, 2); // 4
Math.pow(3, 6); // 729
Math.pow(7, 5); // 16807
```

## `Math.abs()`

Takes in a number as the argument and returns the number's absolute positive value.

```javascript
Math.abs(-5);     // 5
Math.abs(36.24);  // 36.24
Math.abs(-19.17); // 19.17
```

## `Math.min()`

Takes in unlimited numbers as arguments and returns the least one of them.

```javascript
Math.min(1, 2, 3, 4, 5);    // 1
Math.min(21, 64, -87, 14);  // -87
Math.min(8, 9, 1, 6, 0, 3); // 0
```

## `Math.max()`

Takes in unlimited numbers as arguments and returns the greatest one of them.

```javascript
Math.min(1, 2, 3, 4, 5);    // 5
Math.min(21, 64, -87, 14);  // 64
Math.min(8, 9, 1, 6, 0, 3); // 9
```

## `Math.exp()`

Takes in a number (x), as the argument and returns E^x. i.e. Euler's Number to the power of X.

```javascript
Math.exp(10); // 22026.465794806718
Math.exp(3);  // 20.085536923187668
Math.exp(36); // 4311231547115195
```

## `Math.log()`

Takes in a number as the argument and returns the natural logarithm (base E) of that number.

```javascript
Math.log(36);  // 3.58351893845611
Math.log(3);   // 1.0986122886681096
Math.log(-49); // NaN
```

## `Math.sin()`

Takes in a number (in radians) as the argument and returns the sine of the number.

```javascript
Math.sin(0);  // 0
Math.sin(45); // 0.8509035245341184
Math.sin(90); // 0.8939966636005579
```

## `Math.cos()`

Takes in a number (in radians) as the argument and returns the cosine of the number.

```javascript
Math.cos(0);  // 1
Math.cos(45); // 0.5253219888177297
Math.cos(90); // -0.4480736161291702
```

## `Math.tan()`

Takes in a number (in radians) as the argument and returns the tangent of the number.

```javascript
Math.tan(0);  // 0
Math.tan(45);  // 1.6197751905438615
Math.tan(90);  // -1.995200412208242
```
