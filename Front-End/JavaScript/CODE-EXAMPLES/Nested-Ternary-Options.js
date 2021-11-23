// Given
const isBlue = color === '#0000ff';
const isYellow = color === '#ffff00';

// Don't write
return isBlue ? 'blue' : isYellow ? 'yellow' : 'white';

// Maybe ... use if/else statements
if (isBlue) {
  return 'blue';
} else if (isYellow) {
  return 'yellow';
} else {
  return 'white';
}

// Maybe ... use case statements
switch (true) {
  case isBlue:
    return 'blue';
  case isYellow:
    return 'yellow';
  default:
    return 'white';
}

// Maybe ... better if/else statements
if (isBlue) return 'blue';
if (isYellow) return 'yellow';
return 'white';

// Maybe ... use objects
const colors = {
  '#0000ff': 'blue',
  '#ffff00': 'yellow'
};
if (!colors.hasOwnProperty(color)) return 'white';
return colors[color];
