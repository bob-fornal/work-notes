
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

// === Array.prototype.sort

const numberedArray = [1, 30, 4, 21, 100000];
const array1 = [ ...numberedArray ].sort();
// console.log(array1);

const numberSort = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};
const array2 = [ ...numberedArray ].sort(numberSort);
// console.log(array2);

const array3 = numberedArray.map((number) => ('' + number).padStart(12, '0'));
array3.sort();
// console.log(array3);

const statusSort = (a, b) => {
  const a_status = ('' + a.status).toLowerCase();
  const b_status = ('' + b.status).toLowerCase();
  const order = ['active', 'inactive', 'deleted'];

  if (order.indexOf(a_status) < order.indexOf(b_status)) return -1;
  if (order.indexOf(a_status) > order.indexOf(b_status)) return 1;
  return 0;
};
const workSorted = [ ...work ].sort(statusSort);
console.log(workSorted);
