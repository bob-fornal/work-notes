
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
console.log(outerFn);
outerFn.trigger();

(function () {
  var Array = {};
})();

function name2 () {
  innerFn = () => {
    console.log('one');
  };
  return {
    trigger: innerFn
  };
}

const outerFn2 = name2();
