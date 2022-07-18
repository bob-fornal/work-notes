
/*
  Article: https://javascript.plainenglish.io/javascript-hoisting-a-comprehensive-guide-89211c219d45
*/

//--------------------------//
var name = 'Bob';

function printName() {
  console.log(name);
  var name = 'Tim';
  console.log(name);
}
// printName();

//--------------------------//
// printNumber();
var printNumber;

function printNumber() {
  console.log(1);
}

printNumber = function () {
  console.log(2);
}
// printNumber();

//--------------------------//

console.log(str);
console.log(fn);

str = 'Bob Fornal';
var str;

function fn() {
  console.log(str);
}
