
function sumDigits(number) {
  if (Math.abs(number) < 10) return Math.abs(number);
  
  return (Math.abs(number)+'')
    .split('')
    .map(value => parseInt(value))
    .reduce((partial, a) => partial + a, 0);
}

console.log('---', sumDigits(10), 1);
console.log('---', sumDigits(99), 18);
console.log('---', sumDigits(-32), 5);
