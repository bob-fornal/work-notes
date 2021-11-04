# Mixins

Similar to `@extend`, but with arguments.

## `@mixin` and `@include`

```scss
@mixin media($queryString) {
  @media #{$queryString} {
    @content
  }
}

.container {
  width: 900px;
  @include media("(max-width: 767px)") {
    width: 100%;
  }
}
```
