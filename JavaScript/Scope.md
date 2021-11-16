# Scope

Scope if referencing variable access, which variables you have (or do not have) access to in different contexts. In JavaScript, the default scope is window scope or the root scope.

The scope can be visualized as a box of boundaries for variables, objects, and functions which includes restrictions on variables and determines whether you are able to access the variable or not. This limits both the visibility and accessibility of variables to other parts of the code. Having a strong grasp of this concept is essential for a developer.

Scope can be either **local** or **global**; local scope allows for access to everything within the boundaries while global scope is everything outside of these boundaries. Global scope is unable to access variables defined within local scope as it is enclosed within boundaries unless it is returned.

Given ...

```javascript
function hello() {
  let greeting = 'Hello World!';
}

hello();
console.log(greeting); // Reference Error
```

The `ReferenceError` returned as 'greeting' is defined within the local scope of the `hello` function, as such it is impossible to access the variable outside of the function.
