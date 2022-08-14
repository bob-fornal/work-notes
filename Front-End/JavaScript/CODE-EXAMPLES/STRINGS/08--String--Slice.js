
// NO SPLICE

const test = 'This is a string we can use for testing.';

const result1 = test.slice(5, 7);
console.log(`:${ result1 }:`);

const result2 = test.slice(5);
console.log(`:${ result2 }:`);

const result3 = test.slice(-8);
console.log(`:${ result3 }:`);
