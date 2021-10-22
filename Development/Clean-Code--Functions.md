# Functions

What attributes can we give our functions that will allow the casual reader to intuit the kind of program they live inside?

## Small

The first rule of functions is that they should be small. The second rul of functions is that they should be smaller than that.

Each function should be transparently obvious. Each should tell a story. Each should lead you to the next in a compelling order.

## Blocks and Indenting

The indent level of a function should not be greater than one or two.

## Do One Thing

Functions should do one thing. They should do it well. They should do it only.

## Sections within Functions

Functions that do one thing cannot be reasonably divided into sections.

## One Level of Abstraction per Function

Make sure that the statements within functions are all at the same level of abstraction.

## Reading Code from Top to Bottom

"The Stepdown Rule"

Code should read like a top-down narrative. Every function should be followed by those at the next level of abstraction so that the program can be read, descending one level of abstraction at a time down the list of functions.

## Switch Statements

It is hard to make a switch statement that does one thing. Switch statements cannot always be avoided, but we can make sure that each switch statement is buried in a low-level class and is never repeated.


