# Destructuring Function Arguments

## Traditional Object Destructuring

Using `Object.assign()` ...

```javascript
function testing(args) {
	let { name, job, type, isActive } = Object.assign({
		job: 'Developer',
		type: null,
		isActive: false
	}, args);

	console.log(name, job, type, isActive);
}
```

Implemented in parameter assignment

```javascript
function testing({ name, job = 'Developer', type, isActive = false} = {}) {
	console.log(name, job, type, isActive);
}
```

Both are called ...

```javascript
testing({
  name: 'Bob',
  type: 'Senior Solutions Developer'
});
```
