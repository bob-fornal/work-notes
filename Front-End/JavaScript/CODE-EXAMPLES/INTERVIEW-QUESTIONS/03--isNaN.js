// --=====================================================
// 3. isNaN

const checkNaN = () => {
  console.log("-----------");
  console.log(isNaN(345));
  console.log(isNaN('1'));
  console.log(isNaN(true));
  console.log(isNaN(false));

  console.log("-----------");
  console.log(isNaN('Bob'));
  console.log(isNaN(undefined));
  console.log(isNaN({}));

  // Coersion
  console.log("-----------");
  console.log(Number('1'));
  console.log(Number(true));
  console.log(Number(false));

  console.log("-----------");
  console.log(Number('Bob'));
  console.log(Number(undefined));
  console.log(Number({}));
};
checkNaN();
