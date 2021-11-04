# Function Directives

```scss
@function getColumnWidth ($width, $columns, $margin) {
  @return ($width / $columns) - ($margin * 2);
}

width: getColumnWidth(100%, 4, 1%);
```