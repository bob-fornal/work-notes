
const basic = [ 1, 2, 3, 4, 5 ];
const sumBasic = basic.reduce((total, current) => total + current, 0);
console.log(sumBasic); // 15

const items = [{ a: 10 }, { a: 20 }, { a: 30 }];
const sumItems = items.reduce((total, current) => total + current.a, 0);
console.log(sumItems); // 60
