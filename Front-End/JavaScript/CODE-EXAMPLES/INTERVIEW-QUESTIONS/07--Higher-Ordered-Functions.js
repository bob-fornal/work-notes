
// --=====================================================
// 7. Higher-Order Functions (first-class citizens)

const callback = () => {
  console.log('Firing Callback');
};
const higherOrderTest = (fn) => {
  console.log('Function does something');
  fn();
};
higherOrderTest(callback);
