# Grid Pattern

When working on a design that requires changing the layout, look to `display: grid;` rather than media queries.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  grid-gap: 1rem;
}
```

With that one line of CSS with `grid-template-columns`, the CSS can effectively create an infinite column grid:

```css
grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
```

Breaking it down some more:

```css
grid-template-columns: repeat(...)
```

When using `grid-template-columns` write something like `grid-template-columns: 1fr 1fr 1fr 1fr;` which will set 4 columns to be the same size. To make things easier write `repeat(4, 1fr)` and it will do the same thing.

This can be a problem because on smaller screens: there might be a need for two columns, then four columns, then eight columns (and so on) as the browser viewport increases; the number of columns should change depending on how much space there is.

Use the `minmax()` function to help out here ...

```css
grid-template-columns: repeat(4, minmax(250px, 1fr));
```

This sets the minimum size of each grid column to 250px with a maximum of 1fr. The problem is that there will always be four columns.

That’s where the `auto-fill` keyword comes in. [Sara Soueidan wrote a great piece about this](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/) ![Link](../../../foreign.png) a while back and gives an example like this:

```css
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
```

This is why a specific number of columns is not set, but the code fits as many columns as it can in the space available.
