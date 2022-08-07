
// Haven't found a practical use-case for .padEnd
// .padStart is useful for ID data that is displayed
// in a table and we don't have control over the sort

const string1 = '25';
const string2 = '125';

const strings = [ string1, string2 ].sort();
console.log(strings);

const num1 = 25;
const num2 = 125;

const numbers = [ num1, num2 ].sort();
console.log(numbers);

const fixed1 = [ (num1+'').padStart(5, ' '), (num2+'').padStart(5, ' ') ];
const mapped1 = fixed1.sort().map((str) => parseInt(str));
console.log(mapped1);

const fixed2 = [ num1, num2 ];
const mapped2 = fixed2.sort((a, b) => {
  const a_pad = (a+'').padStart(5, ' ');
  const b_pad = (b+'').padStart(5, ' ');
  return a_pad < b_pad;
});
console.log(mapped2);
