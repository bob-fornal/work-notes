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
