# Hoisting

Many developers experience unexpected results from JavaScript code without knowledge of hoisting.

Within JavaScript, a developer can call a function before it is defined without receiving a `ReferenceError`. This is because the JavaScript interpreter moves variable and function declarations to the top of the current scope (whether local or global) prior to execution — this is called Hoisting.
