# Scalable Vector Graphics

- 2D vector based image format
- Device and resolution independent
- Human readable XML code

## Use

- `<img>`
- `<embed>`
- `<object>` (can reference internal code and can use fallback image)
- `<iframe>`
- Inline `<svg>`

## SVG Layout

- SVG Canvas (drawing area)
- viewport (narrow the focus)
- viewBox (control x, y, and zoom level)

## SVG Elements (Overview, not all)

- Graphical Elements (circle, ellipse, line, path, polygon, polyline, rect, text, use)
- Container Elements (defs, g, symbol, svg)
- Gradient Elements (linearGradient and radialGradient)
- Animation Elements (animate, animateMotion, animateTransform, set)

## SMIL (Synchronized Multimedia Integration Language)

**Image Sprite**

Inline SVG Sprites ...

- Hidden collection of code snippets for multiple images
- A single SVG tag
- `<symbol>` element for each image, each has a separate viewBox
- Not rendered until `<use>` element
- Requires a `display: none;` style
- Unique IDs
- `<svg>` with nested `<use>` referencing the symbol ID

PROS

- No http requests
- Code lives in a single location
- No redundancy

CONS

- Image code cannot be cached to speed up load time

## Fragment Identifiers

- Create one image file, placed as close together as possible, noting position/dimensions for use with "viewBox"
- Add tag with path to the file
- `#svgView(viewBox(x, y, w, h))`

Also

- Create `<view>` with viewBox and ID
- Embed method of choice with view-ID

PROS

- Image will be cached by the browser
- Don't need to add viewBox over and over
- May use any embedding technique

CONS

- Individual instances cannot be styled, as with inline
- Needs at least one http request
- Might be difficult to update and edit underlying images

## Embedding SVG code as backgrounds in CSS

- Using data-URIs
- See GrumpIcon for preparation, including fallback

## Animating SVG

Three Methods

- CSS
- SMIL
- JavaScript

## Animating SVG with CSS

- Not stable across browsers
- Does not work with external SVG `<img>`

## Animating SVG with SMIL

- No IE Support, at all

## Animation with JS Manipulation and Libraries

- Snap.svg; IE 9+
- Vivus.js, line art strokes
- D3, animated data visualizations

## Optimization

- Remove hidden items (layers)
- Combine shapes/paths if possible
- Remove any masks if at all possible
- Convert text to outlines
- Trim the canvas
- SVG Optimization Tools
- Examine code and remove any remnants

## Browser Support

- Basic Support, IE 9+
- SVG Fragment Identifiers, IE 10+, iOS 8.3, Safari 7.1+, Android 40+, Chrome 36+
- Browser Bugs ... inconsistencies, handling responsiveness of in-line SVGs
- Padding Hack

## Tools and Resources

- responsiveicons.co.uk
- tympanus.net/Development/ElasticSVGElements/
- svg-news.com
- css-tricks.com
- smashingmagazine.com/tag/svg
- picsvg.com
- svgcircus.com
- sarasoueidan.com/tools/curculus/
- grumpicon.com

## People To Follow

- Sara Soueidan
- Chris Coyier
