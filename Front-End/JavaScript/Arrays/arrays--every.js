
const work = [
  { id: 1, username: 'bob.fornal', status: 'Active' },
  { id: 2, username: 'jen.fornal', status: 'Inactive' },
  { id: 3, username: 'rob.perry', status: 'Active' },
  { id: 4, username: 'logann.perry', status: 'Inactive' },
  { id: 5, username: 'bob.fornal', status: 'DELETED' },
  { id: 6, username: 'jen.fornal', status: 'Active' },
  { id: 7, username: 'bob.fornal', status: 'Active' },
  { id: 8, username: 'rob.perry', status: 'Inactive' },
  { id: 9, username: 'rob.perry', status: 'Active' },
  { id: 10, username: 'bob.fornal', status: 'DELETED' },
];
const newWork = [
  { id: 5, username: 'tim.fornal', status: 'Unknown' }
];

// === Array.prototype.every

function hasUsername(item) {
  return item.username.length > 0;
}

// Shortest and testable
const allHaveUsername1 = work.every((item) => item.username.length > 0);
const allHaveUsername2 = work.every(hasUsername);
console.log('--------------------------');
console.log('All have username', allHaveUsername2);

// Shortest, Speed, Readable 
const allHaveUsername3 = () => work.every((item) => item.username.length > 0);
const allHaveUsername4 = () => {
  let have = true;
  for (let i = 0, len = work.length; i < len; i++) {
    if (work[i].username.length === 0) {
      have = false;
      break;
    }
  }
  return have;
};
const allHaveUsername5 = () => {
  let have = true;
  work.forEach((item) => {
    if (item.username.length === 0) have = false;
  })
  return have;
};

console.time('.every');
console.log(allHaveUsername3());
console.timeEnd('.every');

console.time('for-loop');
console.log(allHaveUsername4());
console.timeEnd('for-loop');

console.time('forEach');
console.log(allHaveUsername5());
console.timeEnd('forEach');
