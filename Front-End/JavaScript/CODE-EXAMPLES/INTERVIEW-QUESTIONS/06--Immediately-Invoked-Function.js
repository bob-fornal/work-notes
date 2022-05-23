
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
