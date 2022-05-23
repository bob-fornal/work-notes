
// --=====================================================
// 4. Pass by Value or by Reference

const passByValue = () => {
  let a = 1;
  let b = a;
  console.log({ a, b });

  b = b + 2;
  console.log({ a, b });
};
passByValue();

const passByReference = () => {
  let c = [ 1 ];
  let d = c;
  console.log({ c, d });

  d.push(2);
  console.log({ c, d });
};
passByReference();

const compareByReference = () => {
  let e = [ 1 ];
  let f = e;
  console.log({ e, f, reference: e === f });

  let g = [ 1 ];
  let h = [ ...g ];
  console.log({ g, h, value: g === h });
};
compareByReference();
