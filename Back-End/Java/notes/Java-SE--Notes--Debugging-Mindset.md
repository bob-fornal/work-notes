# Java Notes - Debugging Mindset

## Debugging

* What is a bug?
* How to avoid bugs.
* Fixing bugs.

## When to Fix Code?

1. Writing code: Spelling and syntax errors.
2. Compiling: build logs.
3. Running: Locally to production.

## Iteration Cycles

The time from finding a bug to testing if it was fixed.

## Common Problems

* Database configuration.
* API endpoint is down.
* API endpoint change.
* Environment variables.
* Code deployment.
* Network problems.

## Verification and Validation

1. Verification: was it build correctly?
2. Validation: was the correct thing built?

## Avoiding Common Mistakes

Missing Values usually generate a syntax error.

* Forgetting `;`.∂
* Not closing `( )`, `{ }`, `[ ]`, `' '`, `" "`.
* Use of `=` instead of `==`.
* Comparing Objects, `.equals()` versus `==`.
* Switch, missing `break` causes fallthrough.
* Switch, can use arrow function.
* Loops, off-by-1 errors.
* Loops, infinite loops.

### Variables

* Names are case-sensitive.
* Scope defines where a variable can be used.

### Best Practices

Organization

* Small focused methods rather than one giant method.
* Group with packages and classes.

Whitespace

* Blank lines, indentation, and spaces.
* See structure and flow of the code.

Descriptive variable names

* Represent what is being stored.
* Avoid excessive abbreviations.

```java
public double calcTot(double prc, double rt, double dr) {
  double disc = prc * dr;
  double subTot = prc - disc;
  double tx = subTot * rt;
  double tot = subTot + tx;
  return tot;
}

public calculateTotal(double price, double taxRate. double discountRate) {
  double discount = price * discountRate;
  double subTotal = price - discount;
  double tax = subTotal * taxRate;
  double total = subTotal + tax;
  return total;
}
```

## Stack Traces

* Filter out common packages.
* Expand to remove line-wrapping.

## Logging Options

`System.out` versus logging frameworks.

```java
System.out.println("System out statement");
// System out statement

logger.warn("Warning statement from logger");
logger.error("Error statement from logger");
// 2022-06-16 02:59:21.156  WARN 10272 --- [nio-8080-exec-1]
// c.g.stacktrace.service.OrderService      : Warning statement from logger
// 2022-06-16 02:59:21.156 ERROR 10272 --- [nio-8080-exec-1]
// c.g.stacktrace.service.OrderService      : Error statement from logger
```
