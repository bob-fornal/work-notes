# Async / Await

Similar to Promises, Async / Await provide a means for maintaining asynchronous operations in a more synchronous manner. They are syntactic sugar on top of Promises.

Async / Await can be used within a REST API request allowing the data to fully load before it is displayed to the user.

```javascript
const displayPeople = async () => {
  const response = await fetch('https://example.com/people');
  const people = await response.json();
  console.log(people);
}

displayPeople(); // Displays after loading and converting response to JSON.
```

In order for JavaScript to know these are Promises, the `await` code needs to be wrapped in an `async` function.
