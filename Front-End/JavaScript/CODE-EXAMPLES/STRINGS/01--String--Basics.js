
// Characters
const basic = 'BASIC';

console.log(`:${ basic.charAt(1) }:`);
console.log(`:${ basic[1] }:`);
console.log(`:${ basic.charAt(-1) }:`);

// Adding Strings

const test1 = 'TEST1';
const test2 = 'TEST2'

const result1 = test1.concat('-').concat(test2);
console.log(`:${ result1 }:`);

const result2 = test1 + '-' + test2;
console.log(`:${ result2 }:`);

const result3 = `${ test1 }-${ test2 }`;
console.log(`:${ result3 }:`);