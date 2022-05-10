
// Hoisting is a default behaviour of javascript where all the variable and function declarations are moved on top. Variable initializations are not hoisted, only variable declarations are hoisted

// 1. Hoisting (Variables)

const testHoising = () => {
  console.log({ first });
  var first = 'Bob';
  console.log({ first });
  
  console.log({ second });
  const second = 'Bob';
  console.log({ second });  

  console.log({ third });
  let third = 'Bob';
  console.log({ third });  
};
// testHoising();

// 1. Hoisting (Functions)

// testHoistFn1();
function testHoistFn1() {
  console.log('Success testHoistFn1');
}

// testHoistFn2();
const testHoistFn2 = () => {
  console.log('Success testHoistFn2');
};

// 2. == versus ===

const testEqualsOperators = () => {
  const x = 2;
  const y = '2';

  console.log({ doubleEquals: x == y});
  console.log({ tripeEquals: x === y});
};
// testEqualsOperators();

const testExplicitComparison = () => {
  const x = 2;
  const y = '2';

  const yAsNumber = parseInt(y, 10);
  console.log({ explicit: x === yAsNumber});
};
// testExplicitComparison();

// 3. isNaN

const checkNaN = () => {
  console.log(isNaN(345));
  console.log(isNaN('1'));
  console.log(isNaN(true));
  console.log(isNaN(false));

  console.log(isNaN('Bob'));
  console.log(isNaN(undefined));
  console.log(isNaN({}));
};
// checkNaN();

// 4. Pass by Value or by Reference

const passByValue = () => {
  let a = 1;
  let b = a;
  console.log({ a, b });

  b = b + 2;
  console.log({ a, b });
};
// passByValue();

const passByReference = () => {
  let c = [ 1 ];
  let d = c;
  console.log({ c, d });

  d.push(2);
  console.log({ c, d });
};
// passByReference();

const compareByReference = () => {
  let e = [ 1 ];
  let f = e;
  console.log({ e, f, reference: e === f });

  let g = [ 1 ];
  let h = [ ...g ];
  console.log({ g, h, value: g === h });
};
// compareByReference();

// 5. Automatic Semicolon Insertion

const testASI = () => {
  // return { name: 'Bob' }
  return
  {
    name: 'Bob'
  }
};
// console.log(testASI());

// 6. Immediately Invoked Function (IIFE)
// (function(){})();
const outerFn = (function name() {
  innerFn = () => {
    console.log('one');
  };
  return {
    trigger: innerFn
  };
})();
// console.log(outerFn);
// outerFn.trigger();

// 7. Higher-Order Functions (first-class citizens)

const callback = () => {
  console.log('Firing Callback');
};
const higherOrderTest = (fn) => {
  console.log('Function does something');
  fn();
};
// higherOrderTest(callback);

// 8. "this"
// The “this” keyword refers to the object that the function is a property of. The value of “this” keyword will always depend on the object that is invoking the function.

const testThisOne = () => {
  console.log(this);
};
// testThisOne();

class TestThis {
  keepValue = 0;

  constructor(value) {
    this.keepValue = value;
  }

  trigger = () => {
    console.log(this);
  };
}
const testThisTwo = new TestThis(2);
const testThisThree = new TestThis(3);
// testThisTwo.trigger();
// testThisThree.trigger();

const testThisFour = {
  name: 'Bob',
  getName: function() {
    return this.name;
  }
};
// console.log(testThisFour.getName());

// 9a. Global Scope (root object, window) - IMPORTANT, things can be overwritten.

// const oldSetTimeout = setTimeout;
// setTimeout = () => { console.log('This was dumb') };
// setTimeout();

// 9b. Function Scope

function testFunctionScope1 () {
  var a = 5;
}
// console.log(a);

const testFunctionScope2 = () => {
  var b = 6;
}
// console.log(b);

// 9c. Block Scope - Block scope is related to the variables declared using let and const. Variables declared with var do not have block scope. Block scope tells us that any variable declared inside a block { }, can be accessed only inside that block and cannot be accessed outside of it.

{
  var c = 7;
  let d = 8;
}
// console.log(c);
// console.log(d);
const testBlockScope = () => {
  for (let i = 0, len = 2; i < len; i++) {
    let j = i * 2;
    console.log(j);
  }
  // console.log(i);
  console.log(j);  
};
// testBlockScope();

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

// 10. Closures
