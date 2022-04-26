
class Question1 {
  s = 'BOB';

  output1 () {
    console.log(this.s);
  }
  
  output2 = () => console.log(this.s);
}

const question1 = new Question1();
setTimeout(question1.output1.bind(question1), 1000)
setTimeout(question1.output2, 2000);

const test1Array = [1, 2, 3, 4, 5];
const new1 = test1Array.map((value) => value * 2);
console.log(test1Array, new1);

const test2Array = [1, 2, 3, 4, 5];
const new2 = test2Array.forEach((value) => value * 2);
console.log(test2Array, new2);

let test3 = [];
let test4 = [];
for (let i = 0, len = 10_000_000; i < len; i++) {
  test3.push(i);
  test4.push(i);
}

console.time('map test');
const new3 = test3.map((value) => value * 2);
console.timeEnd('map test');

console.time('forEach test');
test4.forEach((value) => value * 2);
console.timeEnd('forEach test');

function isObject(val) {
  if (val === null) { return false;}
  return ( (typeof val === 'function') || (typeof val === 'object') );
}

const image = { name: 'BOB.jpg' };
// const image = "ERROR: Authentication Wrong";

function checkImage(image) {
  // if (!!image) {
  //   console.log('image exists');
  // }

  if (isObject(image) === true) {
    console.log('image exists');
  }
}
checkImage(image);

const destructo1 = { name: 'Bob', wife: 'Jen', son: 'Patrick', daughter: 'Anne', email: 'bob.fornal@leadingedje.com' };
let { name, wife, son, daughter } = destructo1;
name = 'Robert';
console.log(name, wife, son, daughter);
console.log(destructo1);

const maxSize = '10222mb';
const regex = /(\d+)(kb|mb|gb|tb)/i;
const destructo2 = regex.exec(maxSize);
console.log(destructo2);
const [_, sizeString, type] = destructo2;
console.log({ sizeString, type });

let title1 = 'ABC';
let title2 = 'DEF';

// let temp = title1;
// title1 = title2;
// title2 = temp;
[title1, title2] = [title2, title1];
console.log({ title1, title2 });

const destructo3 = Object.assign({}, destructo1);
const { email, ...destructo4 } = destructo3;
console.log(email, destructo4);

const test5 = [1, 2, 3, 4, 5];
const test6 = [ ...test5 ];
test6[0] = 100;
console.log(test5, test6);

setTimeout(() => {
  console.log('anonymous');
  throw('bob');
}, 1000);
