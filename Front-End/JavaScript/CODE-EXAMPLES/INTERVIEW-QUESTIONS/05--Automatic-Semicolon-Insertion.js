
// --=====================================================
// 5. Automatic Semicolon Insertion

const testASIWorking = () => {
  return { name: 'Bob' }
};
const testASIBroken = () => {
  return
  {
    name: 'Bob'
  }
};

console.log(testASIWorking());
console.log(testASIBroken());
