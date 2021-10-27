# Object Destructuring

The object destructuring assignment syntax lets a developer extract specific values from JavaScript objects into specific variables.

## Originally

```javascript
const getConfig = () => {
  return {
    url: '...',
    method: 'GET',
    async: true
  };
};

const config = getConfig();
const url = config.url;
const method = config.method;
```

## Improved

With the destructuring syntax, this becomes simpler. It can be done when the function is called and extract the desired keys right from the return value.

```javascript
const { url, method } = getConfig();
```

## More

To isolate a specific key and save the rest of the returned keysuse the rest syntax.

```javascript
const { method, ...rest } = getConfig();
```
