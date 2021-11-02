# Selectors, Properties, and Values

## **Selectors**

A selector is simply the element to be styled. But as you write more CSS code, you'll discover that selectors aren't just elements. They could be attributes, pseudo-classes, ids, classes, and descendants.

* Universal Selector (*)
* Element Selectors
* Classes and IDs
* Descendant Selectors
* Pseudo-Classes

## **CSS Properties**

CSS properties are the styles used on specified selectors. They are written before values in the CSS ruleset and are separated from property values by a colon. Different HTML selectors and elements have different properties. Some properties are universal and can be used on every selector. Others work only on specific selectors and under particular conditions.

## **CSS Values**

Values are written immediately after the colon that separates them from CSS properties. CSS values are not just text; they come in different forms - URLs, units, measurements, integers, strings, inherit, auto, none, etc. We will look at different CSS values and how to implement them.

## Lengths and Percentages

* px: Pixels
* em: calculated size of a font
* pt: Points
* %: percentages

## Shorthand Properties

Shorthand properties are CSS properties that let you set the values of multiple other CSS properties simultaneously. Using a shorthand property, you can write more concise (and often more readable) style sheets, saving time and energy.

A background with the following properties ...

```css
background-color: #000;
background-image: url(images/bg.gif);
background-repeat: no-repeat;
background-position: left top;
```

... can be shortened to just one declaration ...

```css
background: #000 url(images/bg.gif) no-repeat left top;
```