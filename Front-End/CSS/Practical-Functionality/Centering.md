# Centering

Centering content with CSS

## Grid

```css
.grid {
  display: grid;
  place-items: center;
}
```

## Flex

```css
.flexbox {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Margins

```css
.margins {
  display: grid; /* or flex */
}
.margins .content {
  margin: auto;
}
```

## Absolute

```css
.absolute {
  position: relative;
}
.absolute .content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## Table

```css
.table {
  display: table;
}
.table .cell {
  text-align: center;
  vertical-align: middle;
}
```
