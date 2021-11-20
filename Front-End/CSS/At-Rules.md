# At-Rules

## Importing

Use to add another stylesheet to an existing.

```css
@import url(...);
```

`@import` rules MUST be placed at the top of a stylesheet, before any other rules.

## Embedding Fonts

```css
@font-face {
  font-family: '...';
  src: url(...);
}
```

`@font-family`, once defined can then be used in a standard font rule.

## Targeting, Media Types

`@media` can be used to apply styles to a specific media, such as `print`.

* screen
* print
* projection
* handheld
* all

`@media` at-rules can allow difference design choices depending on the screen size.

```css
@media screen and (max-width: 1000px) { }
```

### Orientation Specific

```css
@media screen and (orientation: landscape) { }
@media screen and (orientation: portrait) { }
```
