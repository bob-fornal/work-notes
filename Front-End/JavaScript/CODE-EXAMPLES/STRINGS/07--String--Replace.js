
const test = 'This is a String that we can work with -aaaaa.';
const ssn = '111-22-3333';

const replaced1 = test.replace('a', '-');
console.log(replaced1);

const replaced2 = test.replace(/a/g, '-');
console.log(replaced2);

const replaced3 = test.replaceAll('a', '-');
console.log(replaced3);
