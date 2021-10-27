# Object Comparison

Given ...

```javascript
const user1 = { name : "nerd", organization: "dev" };
const user2 = { name : "nerd", organization: "dev" };

const person1 = { age: 28, name: 'Amy', department: {
  id: 1,
  name: 'DevOps'
}};
let person2 = { name: 'Amy', age: 28, department: {
  id: 1,
  name: 'DevOps'
}};
```

... and knowing ...

```javascript
const equal1 = user1 == user2; // false
```

## Solution: Fast, Limited

```javascript
var equal2 = Object.toJSON(user1) === Object.toJSON(user2); // true
var equal3 = JSON.stringify(user1) === JSON.stringify(user2); //true
```

## Solution: More Generic (one level)

```javascript
const shallowEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) return false;
  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
  }
  return true;
};
```

## Solution: More Generic (deep)

```javascript
const deepEqual = (object1, object2) => {
  let props1 = Object.getOwnPropertyNames(object1);
  let props2 = Object.getOwnPropertyNames(object2);

  if (props1.length != props2.length) return false;
  for (let i = 0, len = props1.length; i < len; i++) {
    let prop = props1[i];
    let bothAreObjects = typeof(object1[prop]) === 'object' && typeof(object2[prop]) === 'object';
    if ((!bothAreObjects && (object1[prop] !== object2[prop]))
    || (bothAreObjects && !deepEqual(object1[prop], object2[prop]))) {
      return false;
    }
  }
  return true;
};
```