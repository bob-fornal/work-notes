
const timeFunction = async (fn, name='') => {
  console.time(name);
  await fn();
  console.timeEnd(name);
};

const fn1 = () => {
  for (let i = 0; i < 1000; i++) {
    const element = i;
  }
};

const fn2 = () => {
  let index = 0;
  while (index < 1000) {
    const element = index;
    index++;
  }
};

timeFunction(fn1, 'function 1');
timeFunction(fn2, 'function 2');
