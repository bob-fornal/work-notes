
function persistence(num) {
  if (num < 10) return 0;

  const reducedNum = (num+'')
    .split('')
    .map(value => parseInt(value))
    .reduce((partial, a) => partial * a, 1);
 console.log('=', num, reducedNum);
  if (reducedNum < 10) return 1;
  return 1 + persistence(reducedNum);
}

console.log('---', persistence(39), 3);
console.log('---', persistence(4), 0);
console.log('---', persistence(25), 2);
console.log('---', persistence(12), 1);
console.log('---', persistence(999), 4);
