
// --=====================================================
// 9a. Global Scope (root object, window) - IMPORTANT,
// things can be overwritten.

// const oldSetTimeout = setTimeout;
// setTimeout = () => { console.log('This was dumb') };
// setTimeout();

// 9b. Function Scope
function testFunctionScope1 () {
  var a = 5;
}
console.log(a);

const testFunctionScope2 = () => {
  var b = 6;
}
console.log(b);

// 9c. Block Scope - Block scope is related to the variables
// declared using let and const. Variables declared with var
// do not have block scope. Block scope tells us that any
// variable declared inside a block { }, can be accessed
// only inside that block and cannot be accessed outside
// of it.
{
  var c = 7;
  let d = 8;
}
console.log(c);
console.log(d);
const testBlockScope = () => {
  for (let i = 0, len = 2; i < len; i++) {
    let j = i * 2;
    console.log(j);
  }
  console.log(i);
  console.log(j);  
};
testBlockScope();

// 9d. Scope Chain
var sc1 = 24;
const testScopeChain = () => {
  var sc2 = 667;

  var anotherTestScopeChain = function() {
    console.log(sc2);
  };

  var andAnotherTestScopeChain = function () {
    console.log(sc1);
  };

  anotherTestScopeChain();
  andAnotherTestScopeChain();
};
testScopeChain();
