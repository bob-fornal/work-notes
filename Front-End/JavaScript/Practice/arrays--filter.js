
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

// === Array.prototype.filter

const isUserAndActive1 = (username) => {
  const data = work.filter((item) => item.username === username && item.status === 'Active');
  console.log(data);
  return data.length > 0;
};
console.log('filter', isUserAndActive1('bob.fornal'));
