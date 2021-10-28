# Error Handling

Error handling is important, but if it obscures logic, it is wrong.

## Use Try-Catch-Finally with Exceptions

Use exceptions rather than RETURN CODES.

## Provide Context with Exceptions

Each exception should provide enough context to determine the source and location of an error.

Create informative error messages and pass them along with your exceptions.

* **Don't return `null`**
* **Don't pass `null`**
