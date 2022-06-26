
// 6. Immediately Invoked Function Execution (IIFE)
// (function(){})();
const outerFn = (function name() {
  const innerFn = () => {
    console.log('one');
  };
  return {
    trigger: innerFn
  };
})();
console.log(outerFn);
outerFn.trigger();

// (function () {
//   var Array = {};
// })();

function name2 () {
  const innerFn = () => {
    console.log('two');
  };
  return {
    trigger: innerFn
  };
}

const outerFn2 = name2();
outerFn2.trigger();
