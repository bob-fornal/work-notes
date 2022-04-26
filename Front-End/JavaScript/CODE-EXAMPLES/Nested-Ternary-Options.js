
class HandleTernaries {
  
  color = '';
  getColor = (color) => this.color = color;

  // Given
  isBlue = (color) => color === '#0000ff';
  isYellow = (color) => color === '#ffff00';

  test1 = () => {
    // Don't write
    return this.isBlue ? 'blue' : this.isYellow ? 'yellow' : 'white';
  };
  
}


const test2 = () => {
  // Maybe ... use if/else statements
  if (isBlue) {
    return 'blue';
  } else if (isYellow) {
    return 'yellow';
  } else {
    return 'white';
  }
};

const test3 = () => {
  // Maybe ... use case statements
  switch (true) {
    case isBlue:
      return 'blue';
    case isYellow:
      return 'yellow';
    default:
      return 'white';
  }
};

const test4 = () => {
  // Maybe ... better if/else statements
  if (isBlue) return 'blue';
  if (isYellow) return 'yellow';
  return 'white';
};

// Maybe ... use objects
const colors = {
  '#0000ff': 'blue',
  '#ffff00': 'yellow'
};

const test5 = () => {
  if (!colors.hasOwnProperty(color)) return 'white';
  return colors[color];
};
