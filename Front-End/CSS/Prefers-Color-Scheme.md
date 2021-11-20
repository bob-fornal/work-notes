# Prefers Color Scheme

[MDN REFERENCE](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) ![Link](../foreign.png)

```css
@media (prefers-color-scheme: light) {
  :root {
    --body-bg: #ffffff;
    --body-color: #000000;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --body-bg: #000000;
    --body-color: #ffffff;
  }  
}
```