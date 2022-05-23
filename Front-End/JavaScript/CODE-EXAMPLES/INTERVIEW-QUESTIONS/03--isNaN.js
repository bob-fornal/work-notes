// --=====================================================
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
checkNaN();
