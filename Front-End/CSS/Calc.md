# `Calc()`

> Awesome in a sneaky kind of way.

```css
... calc(100vw - 2em);

.container {
  max-width: 800px;
  width: calc(100vw - 2em);
  margin: 0 auto;
}
.big-image {
  max-width: 100vw;
  width: 100%;
  margin: 0 calc(-50vw + 50%);
  max-height: 30vw;
  object-fit: cover;
}
.cta {
  background: #ee6352;
  width: 100vw;
  margin: 0 calc(-50vw + 50%);
  padding: 3em;
}
.title {
  font-size: calc(5vw + 1rem);
}
```