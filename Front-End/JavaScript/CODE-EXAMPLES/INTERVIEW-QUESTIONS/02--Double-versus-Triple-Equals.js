
// --=====================================================
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
testExplicitComparison();

