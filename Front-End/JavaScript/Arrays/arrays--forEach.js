
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

// === Array.prototype.forEach

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

console.log(Object.keys(filterable));
Object.keys(filterable).forEach((key) => {
  filterable[key].sort();
})

console.log('--------------------------');
console.log(filterable);

