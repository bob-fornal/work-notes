
// --=====================================================
// Hoisting is a default behaviour of javascript where all
// the variable and function declarations are moved on top.
// Variable initializations are not hoisted, only variable
// declarations are hoisted.

// 1. Hoisting (Variables)
const testHoising = () => {
  // console.log({ first });
  var first = 'Bob';
  // console.log({ first });
  
  // console.log({ second });
  const second = 'Bob';
  // console.log({ second });  

  // console.log({ third });
  let third = 'Bob';
  // console.log({ third });  
};
testHoising();

// 1. Hoisting (Functions)

testHoistFn1();
function testHoistFn1() {
  console.log('Success testHoistFn1');
}

testHoistFn2();
const testHoistFn2 = () => {
  console.log('Success testHoistFn2');
};
