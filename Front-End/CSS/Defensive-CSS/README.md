# Defensive CSS

From this article [HERE](https://ishadeed.com/article/defensive-css/)

There should be a way to avoid a certain CSS issue or behaviors from happening. Content is dynamic, and things can change on a web page, thus increasing the possibility of a CSS issue or unusual behavior.

Defensive CSS is a collection of snippets that can help when writing CSS that is protected.

## Flexbox Wrapping

CSS flexbox is one of the most useful CSS layout features nowadays. It is tempting to add `display: flex` to a wrapper and have the child items ordered next to each other.

The thing is when there is not enough space, those child items will not wrap into a new line by default. This can be changed with `flex-wrap: wrap`.

```css
.options-list {
  display: flex;
  flex-wrap: wrap;
}
```

## Spacing

Developers need to account for different content lengths. That means, spacing should be added to a component, even though it seems like not needed.

```css
.section__title {
  margin-right: 1rem;
}
```

## Long Content

Accounting for long content is important when building layout.

```css
.username {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

## Stretched or Compressed Images

When there is no control over an image’s aspect ratio on a web page, it is better to think ahead and provide a solution when a user uploads an image that is not aligned with the aspect ratio.

The simplest fix for this is to use CSS `object-fit`.

```css
.card__thumb {
  object-fit: cover;
}
```

At a project level, it might be good to add `object-fit` to all images to avoid unexpected image results.

```css
img {
  object-fit: cover;
}
```

## Nested Scrolling

With an open modal, a user starts scrolling, and then reaches the end only to keep scrolling, the content underneath the modal scrolls. This is called **scroll chaining**.

The nice thing about this property is that it will not have any effect until there is scrolling.

```css
.modal__content {
  overscroll-behavior-y: contain;
  overflow-y: auto;
}
```

## Variable Fallback

CSS variables are gaining more and more usage in web design. There is a method that can be apply to use them in a way that does not break the experience, in case the CSS variable value was empty for some reason.

This is particularly useful when feeding the value of a CSS variable via Javascript. Here is an example:

```css
.message__bubble {
  max-width: calc(100% - var(--actions-width));
}
```

The variable `--actions-width` is being used within the `calc()` function and its value is coming from Javascript. Suppose that Javascript failed for some reason, the `max-width` will compute to `none`.

To fix this, add a fallback value to the `var()`.

```css
.message__bubble {
  max-width: calc(100% - var(--actions-width, 70px));
}
```

This way, if the variable is not defined, the fallback (`70px`) will be used. This approach can be used in case there is a possibility that the variable might fail. Otherwise, it is not needed.

## Fixed Width or Height

One of the common things that break a layout is using a fixed width or height with an element that has content in different lengths.

### Fixed Height

There is often a section with a fixed height and content that is larger than that height, which results in a broken layout.

To avoid the content leaking out of the hero, use `min-height` instead of `height`.

```css
.hero {
  min-height: 350px;
}
```

If the content gets larger, the layout will not break.

### The Fixed Width

Think of a button that has its label too close to the left and right edges. This is due to using a fixed width.

```css
.button {
  width: 100px;
}
```

If the button’s label is longer than 100px, it will be close to the edges. If it is too long, the text will leak out of it.

Simply replace `width` with `min-width`.

```css
.button {
    min-width: 100px;
}
```

## Forgetting `background-repeat`

When using a large image as a background, develoers can forget to account for the case when the design is viewed on a large screen. That background will repeat by default.

This generally is not visible on a laptop screen, but it can be seen clearly on larger screens.

To avoid that behavior in advance, make sure to reset `background-repeat`.

```css
.hero {
  background-image: url('..');
  background-repeat: no-repeat;
}
```

## Vertical Media Queries

Sometimes, it is tempting to build a component and only test by resizing the browser’s width. Testing against the browser’s height can reveal some interesting problems.

With an aside component with main and secondary links. The secondary links should be positioned at the very bottom of the aside section.

The main and secondary navigation looks okay. The developer added `position: sticky` to the secondary navigation so that it can stick to the bottom.

However, if the browser height is smaller, things will break.

By using CSS vertical media queries, the issue can be avoided.

```css
@media (min-height: 600px) {
  .aside__secondary {
    position: sticky;
    bottom: 0;
  }
}
```

This way, the secondary navigation will only be stuck to the bottom if the viewport height is **larger than or equal to 600px**.

## Using `justify-content: space-between`

`justify-content` might be used in a flex container to space the child items from each other. With a certain number of child items, the layout will look okay. However, when they increase or decrease, the layout will look odd.

We have a flex container with four items. The spacing between each item isn’t a gap or margin, it is there because the container has `justify-content: space-between`.

```css
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
```

When the number of items gets low, odd things happen (try with three).

* Margin
* Flexbox gap (Use with caution)
* Padding (Can be applied to the parent of each child element)
* Adding empty elements to act as a spacer.

For simplicity, use gap.

```css
.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
```

## Text Over Images

When using the text over an imaging approach, it is important to account for the case where the image fails to load.

This is fixed easily by adding a background color to the `<img>` element. This background will only be visible if the image fails to load.

```css
.card__img {
  background-color: grey;
}
```

## Fixed Values in a CSS Grid

With a grid that contains an aside and main. The CSS looks like this:

```css
.wrapper {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1rem;
}
```

This will break on small viewport sizes due to the lack of space. To avoid such an issue, always use a media query when using CSS grid like the above.

```css
@media (min-width: 600px) {
  .wrapper {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 1rem;
  }
}
```

## Scrollbar Only When Needed

Displaying a scrollbar or not can be controlled when there is long content. That being said, it is highly recommended to use `auto` as a value for `overflow`.

With short content, it is confusing to see a scrollbar when it’s not needed.

```css
.element {
  overflow-y: auto;
}
```

With `overflow-y: auto`, the scrollbar will only be visible if the content is long. Otherwise, it will not be there.

## Scrollbar Gutter

Another thing that is related to scrolling is the scrollbar gutter. Taking the previous example, when the content gets longer, adding a scrollbar will cause a layout shift. The reason the layout shift happens is to reserve a space for the scrollbar.

Avoid this behavior by using the `scrollbar-gutter` property.

```css
.element {
  scrollbar-gutter: stable;
}
```

## Minimum Content Size In CSS Flexbox

If a flex item has a text element or an image that is bigger than is longer than the item itself, the browser will not shrink them. That is the default behavior for flexbox.

```css
.card {
  display: flex;
}
```

When the title has a long word, it does not wrap into a new line.

Even using `overflow-break: break-word` does not work.

```css
.card__title {
  overflow-wrap: break-word;
}
```

To change that default behavior, set the `min-width` of the flex item to 0. That’s because the `min-width` default value is `auto`, the overflow happens.

```css
.card__title {
  overflow-wrap: break-word;
  min-width: 0;
}
```

The same thing applies to a column flex wrapper, but we will use `min-height: 0` instead.

## Minimum Content Size In CSS Grid

Similar to flexbox, CSS grid has a default minimum content size for its child items which is `auto`. This means, if there is an element that is larger than the grid item, it will overflow.

Here is the HTML and CSS.

```html
<div class="wrapper">
  <main>
    <section class="carousel"></section>
  </main>
  <aside></aside>
</div>
```

```css
@media (min-width: 1020px) {
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 248px;
    grid-gap: 40px;
  }
}

.carousel {
  display: flex;
  overflow-x: auto;
}
```

Since the carousel is a flex container that does not wrap, its width is larger than the main section, and thus the grid item respected that. As a result, there is horizontal scrolling.

To fix this, there are three different solutions:

* Using `minmax()`
* Applying `min-width` to the grid item
* Adding `overflow: hidden` to the grid item

As a defensive CSS mechanism, go for the first one which is using the `minmax()` function.

```css
@media (min-width: 1020px) {
  .wrapper {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 248px;
    grid-gap: 40px;
  }
}
```

## Auto Fit Vs Auto Fill

When using CSS grid `minmax()` function, it is important to decide between using the `auto-fit` or `auto-fill` keywords. When used incorrectly, it can lead to unexpected results.

When using `minmax()` function, the `auto-fit` keyword will expand the grid items to fill the available space. While `auto-fill` will keep the available space reserved without altering the grid items width.

That being said, using `auto-fit` might lead to grid items being too wide, especially when they are less than expected.

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
}
```

If there is only one grid item and `auto-fit` is used, the item will expand to fill the container width.

Most of the time, such behavior is not needed, so using `auto-fill` is better.

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
}
```

## Image Maximum Width

As a general rule, do not forget to set `max-width: 100%` to all images. This can be added to the CSS reset.

```css
img {
  max-width: 100%;
  object-fit: cover;
}
```

## `position: sticky` CSS Grid

When using `position: sticky` with a child of a grid container, the default behavior for grid items is to stretch. As a result, the aside element is equal to the main section height.

To make it work as expected, reset the `align-self` property.

```css
aside {
  align-self: start;
  position: sticky;
  top: 1rem;
}
```

## Grouping Selectors

It is not recommended to group selectors that are meant to work with different browsers. For example, styling an input’s placeholder needs multiple selectors per the browser. If we group the selectors, the entire rule will be invalid, according to the W3C.

```css
/* Don't do this, please */
input::-webkit-input-placeholder,
input:-moz-placeholder {
  color: #222;
}
```

Instead, do this.

```css
input::-webkit-input-placeholder {
  color: #222;
}
input:-moz-placeholder {
  color: #222;
}
```
