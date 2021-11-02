# Specificity

Two (or more) conflicting CSS rules that point to the same element ... most specific rule wins.

## MORE SPECIFIC = GREATER PRECEDENCE

* If selectors are the same, last takes precedence.
* If selectors differ, the more specific a selector, the more preference it will be given.

## Calculation

| Type           | Weight |
|----------------|--------|
| ID Selector    | 100    |
| Class Selector | 10     |
| HTML Selector  | 1      |
