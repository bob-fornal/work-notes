# Introduction to Grid Layout

Start with giving the display property `grid` to the container element or parent element.

```css
.container {
  display: grid;
}
```

Nothing will change after adding `display: grid;` in the parent container because the width of the columns have to be defined. In order to set the column's width use the `grid-template-columns` property.

## Columns

For example, for two columns of width 60% and 40% respectively with a gap ...

```css
grid-template-columns: 60% 40%;
grid-gap: 10px;
```

## Rows

`grid-template-rows` are used to define the number of rows and height of rows.

```css
grid-template-rows: 200px 400px;
```

```css
.container {
  grid-template-columns: 200px 200px 200px 200px 200px;
  grid-template-rows: 200px 400px;
}
```

Instead of the repeated code, use the `repeat` function ...

```css
grid-template-columns: repeat(5, 200px);
```

Moving forward, set the height of the grid element using `grid-auto-rows` ...

```css
grid-auto-rows: 200px;
```

### **ISSUE**

By doing this, the height is fixed so content inside the items can overflow. In order to prevent this kind of issue use the `minmax` function .

```css
grid-auto-rows: minmax(200px, auto);
```

It is pretty intuitive that the height of gird items will be 200px minimum and "auto" maximum(according to content).


