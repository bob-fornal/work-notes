# Retrieving Value from JSON

This function will return the value of a specified path given and object or array.

```javascript
const getValueFromJSON = (obj, path) => {
  path
    .replace(/\[([^[\]]*)]/g, '.$1.')
    .split('.')
    .filter((prop) => prop !== '')
    .reduce(
      (previous, next) => (previous instanceof Object ? previous[next] : undefined), obj
    );
};
```

```javascript
const data = {
  user: {
    job: {
      company: 'xxx',
      role: 'tech lead'
    },
    books: [
      'book1',
      'book2'
    ]
  }
};

getValueFromJSON(data, 'user.job.role'); // tech lead
getValueFromJSON(data, 'user.books[1]'); // book2
```
