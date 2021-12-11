
const user = {
  name: 'Bob',
  age: 53,
  isWebDeveloper: true
};

const values = Object.values(user);
console.log(values); // [ 'Bob', 15, true ]

const keys = Object.keys(user);
console.log(keys); // [ 'name', 'age', 'isWebDeveloper' ]
