
const work = [];

function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

for(let i = 0, len = 100_000_000; i < len; i++) {
  const length = Math.floor(Math.random(20));
  const object = { username: makeId(length) };
  work.push(object);
}

console.log('Testing Types of Code ...')

const allHaveUsername1 = () => work.every((item) => item.username.length > 0);

const allHaveUsername2 = () => work.every(hasUsername);

function hasUsername(item) {
  return item.username.length > 0;
}

const allHaveUsername3 = () => {
  let have = true;
  for (let i = 0, len = work.length; i < len; i++) {
    if (work[i].username.length === 0) {
      have = false;
      break;
    }
  }
  return have;
};

const allHaveUsername4 = () => {
  let have = true;
  work.forEach((item) => {
    if (item.username.length === 0) have = false;
  })
  return have;
};

console.time('Shortest');
console.log('Shortest:', allHaveUsername1());
console.timeEnd('Shortest');

console.time('Testable');
console.log('Testable:', allHaveUsername2());
console.timeEnd('Testable');

console.time('Fastest');
console.log('Fastest:', allHaveUsername3());
console.timeEnd('Fastest');

console.time('Readable');
console.log('Readable', allHaveUsername4());
console.timeEnd('Readable');
