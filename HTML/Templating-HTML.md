# Templating HTML

## `template` Element

HTML has a `template` element. Its purpose is to hold HTML that should not be rendered as-is, but is intended to be used as a template with JavaScript later.

Here, the `#list-item` element contains a list item that can be used to generate a list of wizards. It contains an `li` element with a `.user` class on it.

```html
<div id="app"></div>

<template id="list-item">
	<li class="user"></li>
</template>
```

In the JavaScript, use the `document.querySelector()` method to get the `#app` element (where to add the list) and the `#list-item` element (the template).

There is also an array of users.

```javascript
// capture elements
let app = document.querySelector('#app');
let listItem = document.querySelector('#list-item');
// data
let users = [ 'Bob', 'Jen', 'Patrick', 'Anne' ];
```

To do this, first, create a `ul` element with the `document.createElement()` method.

```javascript
// list element
let list = document.createElement('ul');
```

Next, then loop through the users and use the `listItem` template for the HTML.

The content inside is a document fragment that can be accessed with the content property. Because it is used more than once, create a clone of it with the `Element.cloneNode()` method.

```javascript
for (let user of users) {
	let li = listItem.content.cloneNode(true);
}
```

At this point, `li` is a copy of document fragment in our template. Use the `document.querySelector()` method to find the `li` within it.

```javascript
for (let user of users) {
	let li = listItem.content.cloneNode(true).querySelector('li');
}
```

Now, add the users to it with the `Node.textContent` property, and add it to the `list` element with the `Element.append()` method.

```javascript
for (let user of users) {
	let li = listItem.content.cloneNode(true).querySelector('li');
	li.textContent = wizard;
	list.append(li);	
}
```

Then, append the entire list to the DOM.

```javascript
app.append(list);
```

## `template` Element with More Items

Imagine if the template actually looked like this instead.

```html
<template id="list-item">
	<div class="user">
		<strong class="user-name"></strong>
	</div>
</template>
```

First, create an array to hold the elements from the template.

```javascript
let elems = ;
```

Next, loop through each user, get the template content, clone it, and look for the div inside.

```javascript
for (let user of users) {
	let div = listItem.content.cloneNode(true).querySelector('div');
}
```

Use the `document.querySelector()` to find the strong element inside the div, and set its `textContent` property to the value of the wizard.

Then, use the `Array.push()` method to add the div to the `elems` array.

```javascript
for (let user of users) {
	let div = listItem.content.cloneNode(true).querySelector('div');
	let strong = div.querySelector('strong');
	strong.textContent = wizard;
	elems.push(div);
}
```

Finally, use the `Element.append()` method to add each element, using the spread syntax operator to pass the whole array in at once.

```javascript
app.append(...elems);
```

## Creating HTML with JavaScript

It is a lot more common for people to use template literals and generate their HTML entirely in JavaScript. With this approach, the `template` element can be skipped entirely.

There are a few ways to approach it, but the one beginners find the most readable is to first create an empty string to hold the html.

```javascript
let html = '';
```

On each loop, you append (or concatenate) the `html` string with another HTML string. Template literals make it really easy to add variable content inside the string.

When done, use the `Element.innerHTML` property to add the html string to the DOM.

(If using third-party data, **DO NOT** forget to sanitize the HTML string first to protect against XSS attacks.)

```javascript
for (let user of users) {
	html +=
		`<div class="wizard">
			<strong>${wizard}</strong>
		</div>`;
}
app.innerHTML = html;
```

## A Hybrid Approach

The `template` element does not support string interpolation (replacing variables with data) like template literals do. But, JavaScript can be used to make this happen.

```javascript
/**
 * Get a template from a string
 * https://stackoverflow.com/a/41015840
 * @param  {String} str    The string to interpolate
 * @param  {Object} params The parameters
 * @return {String}        The interpolated string
 */
function interpolate (str, params) {
	let names = Object.keys(params);
	let vals = Object.values(params);
	return new Function(...names, `return \`${str}\`;`)(...vals);
}
```

Pass in the string as the first argument, and an object of parameters as the second.

To use it, setup the `template` element with variables in it just like a template literal.

```javascript
<template id="list-item">
	<div class="user">
		<strong>${user}</strong>
	</div>
</template>
```

Inside the JavaScript, pass the `template` element's `Element.innerHTML` property value into the `interpolate()` function as the string.

The `params` need to be an object, so wrap the user in an object and pass that in as the second argument. Concatenate the string that is returned back to the `html` string.

```javascript
let html = '';
for (let user of users) {
	html += interpolate(listItem.innerHTML, { user });
}
app.innerHTML = html;
```

The value of this is pretty minimal in a simple example, but can be pretty awesome with larger templates.

There are a few drawbacks to this approach, though. The biggest one is that it uses the `Function()` method, which can expose the code to cross-site scripting attacks with third-party data.

Also, unlike a real template literal, it cannot support logic (if...else, loops, and so on) inside the template.

This is a cool trick for special circumstances.
