
// Map versus forEach
const test1Array = [1, 2, 3, 4, 5];
const new1 = test1Array.map((value) => value * 2);
// console.log(test1Array, new1);

const test2Array = [1, 2, 3, 4, 5];
const new2 = test2Array.forEach((value) => value * 2);
// console.log(test2Array, new2, test2Array);

const test3Array = [1, 2, 3, 4, 5];
const new3 = test2Array.forEach((value, index) => {
  test3Array[index] = value * 2;
});
// console.log(test3Array, new3);

let test4 = [];
let test5 = [];
let test6 = [];
let test7 = [];
for (let i = 0, len = 10_000_000; i < len; i++) {
  test4.push(i);
  test5.push(i);
  test6.push(i);
  test7.push(i);
}

console.time('map test');
const new4 = test4.map((value) => value * 2);
console.timeEnd('map test');

console.time('forEach test');
test5.forEach((value, index) => {
  test5[index] = value * 2;
});
console.timeEnd('forEach test');

console.time('for-loop no-size test');
for (let i = 0; i < test6.length; i++) {
  test6[i] = test6[i] * 2;
}
console.timeEnd('for-loop no-size test');

console.time('for-loop size test');
for (let i = 0, len = test7.length; i < len; i++) {
  test7[i] = test7[i] * 2;
}
console.timeEnd('for-loop size test');
