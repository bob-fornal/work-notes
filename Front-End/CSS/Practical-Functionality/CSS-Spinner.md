# CSS Spinner

## HTML

```html
<div class="spinner"></div>
```

## CSS

```css
.spinner {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 5px solid #eee;
  border-left-color: #00bcd4;
  animation: spin 1.2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```
