
// DESTRUCTURE OBJECT
const destructo1 = {
  _name: 'Bob', wife: 'Jen',
  son: 'Patrick', daughter: 'Anne',
  email: 'bob.fornal@leadingedje.com'
};
let { _name, wife, son, daughter } = destructo1;
_name = 'Robert';
// console.log(_name, wife, son, daughter);
// console.log(destructo1);

// DESTRUCTURE ARRAY
const maxSize = '10222mb';
const regex = /(\d+)(kb|mb|gb|tb)/i;
const destructo2 = regex.exec(maxSize);
// console.log(destructo2);
// const [_, sizeString, type] = destructo2;
// console.log({ sizeString, type });

// DESTRUCTURING FOR VARIABLE SWAPPING
let title1 = 'ABC';
let title2 = 'DEF';

// let temp = title1;
// title1 = title2;
// title2 = temp;

[title1, title2] = [title2, title1];
// console.log({ title1, title2 });

// DESTRUCTURE REMOVE OBJECT KEYS (Spread)
const destructo3 = Object.assign({}, destructo1);
const { email, ...destructo4 } = destructo3;
// console.log(email, destructo4);

// SPREAD TO CREATE NEW ARRAY
const test5 = [1, 2, 3, 4, 5];
const test6 = [ ...test5 ];
test6[0] = 100;
// console.log(test5, test6);
