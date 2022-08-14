
const test = '  This is what I typed.  ';

const result1 = test.trim();
console.log(`:${ result1 }:`);

const result2 = test.trimStart();
console.log(`:${ result2 }:`);

const result3 = test.trimEnd();
console.log(`:${ result3 }:`);

const literal = `
  this is code
  and this is too
`;
