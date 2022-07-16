
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

// Array.prototype.at (new)

// console.log(work[1]);
// console.log(work.at(1));

// console.log(work[work.length - 1]);
// console.log(work.at(-1));

// Array.prototype.concat

// const updated = work.concat(newWork);
const updated1 = [ ...work, ...newWork ];
// const updated2 = [ work[0], work[1], work[2], work[3], newWork[0]];
// console.log(work);
// console.log(newWork);
// console.log('--------------------------');
// console.log(updated1);

// Array.prototype.every

function hasUsername(item) {
  return item.username.length > 0;
}

const allHaveUsername1 = work.every((item) => item.username.length > 0);
const allHaveUsername2 = work.every(hasUsername);
// console.log('--------------------------');
// console.log('All have username', allHaveUsername2);

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

// console.time('.every');
// console.log(allHaveUsername3());
// console.timeEnd('.every');

// console.time('for-loop');
// console.log(allHaveUsername4());
// console.timeEnd('for-loop');

// console.time('forEach');
// console.log(allHaveUsername5());
// console.timeEnd('forEach');

// Array.prototype.filter

isUserAndActive1 = (username) => {
  const data = work.filter((item) => item.username === username && item.status === 'Active');
  return data.length > 0;
};
// console.log('filter', isUserAndActive1('bob.fornal'));

// Array.prototype.findIndex

const comments = 'Title (subtitle here)';
const commentsArray = comments.split('');
// console.log(commentsArray);

const parenIndex1 = commentsArray.findIndex((item) => item === '(');
const subtitle1 = comments.substring(parenIndex1);
const title1 = comments.replace(' ' + subtitle1, '');
// console.log(parenIndex1);
// console.log('.' + subtitle1 + '.');
// console.log('.' + title1 + '.');

const subtitle2 = comments.substring(comments.indexOf('('));
const title2 = comments.replace(' ' + subtitle2, '');
// console.log('.' + subtitle2 + '.');
// console.log('.' + title2 + '.');

// Array.prototype.findLastIndex

const filename = 'another.xxxxxx.file.here.txt';
const filenameArray = filename.split('');

const lastIndex1 = filenameArray.findLastIndex((item) => item === '.');
const extension1 = filename.substring(lastIndex1);
// console.log(lastIndex1);
// console.log('.' + extension1 + '.');

const lastIndex2 = filename.lastIndexOf('.');
const extension2 = filename.substring(lastIndex2);
// console.log('.' + extension2 + '.');

// Array.prototype.forEach

const filterable = {
  usernames: [],
  statuses: []
};
console.log(filterable);

work.forEach((item) => {
  if (!filterable.usernames.includes(item.username)) {
    filterable.usernames.push(item.username);
  }
  if (!filterable.statuses.includes(item.status)) {
    filterable.statuses.push(item.status);
  }
});
// console.log(Object.keys(filterable));
Object.keys(filterable).forEach((key) => {
  filterable[key].sort();
})
console.log('--------------------------');
console.log(filterable);

// Array.prototype.some

isUserAndActive2 = (username) => {
  return work.some((item) => item.username === username && item.status === 'Active');
};
// console.log('some', isUserAndActive2('bob.fornal'));
