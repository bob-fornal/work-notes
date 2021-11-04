# Extends and Placeholders

## `@extend`

```scss
.input {
  border-radius: 3px;
  border: 4px solid #ddd;
  /* ... */
}
.error-input {
  @extend .input;
  border: 2px solid #e74c3c;
}
```

```scss
%input-style { /* % means not rendered outright */
  font-size: 14px;
}
.input {
  @extend %input-style;
  color: black;
}
```