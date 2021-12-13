# `target` versus `currentTarget`

* The `target` is the DOM element that triggers the event.
* The `currentTarget` is the DOM element listening for events.

```jsx
const App = () => {
  return (
    <ul class="todo-list" onClick={ () => {
      console.log(e.currentTarget); // <ul class="todo-list"></ul>
      console.log(e.target); // <li class="item">Go Shopping</li>
    } }>
      <li class="item">Go Shopping</li>
    </ul>
  );
};
```
