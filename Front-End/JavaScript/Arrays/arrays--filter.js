
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
// console.log('filter', isUserAndActive1('bob.fornal'));

// const isDuplicate1

class GetKeyedValues {

  data = [];

  keys = [];
  results = {};

  constructor(data) {
    this.data = data;
    this.processData();
  }

  processData = () => {
    this.data.forEach((item, index) => {
      if (index === 0) {
        this.keys = Object.keys(item);
        this.keys.forEach((key) => {
          this.results[key] = [];
        });
      }
      this.keys.forEach((key) => {
        this.results[key].push(item[key]);
      });
    });
  };

  getProcessedData = () => {
    return {
      data: this.data,
      keys: this.keys,
      results: this.results
    };
  };

}

// Gathering Data
const keyed = new GetKeyedValues(work);
const processed = keyed.getProcessedData();
console.log(processed);

// Processing Data 1
const usernames = processed.results.username;
const uniqueUsernames1 = usernames.filter((username, index) => {
  return index === usernames.indexOf(username);
}).sort();

const statuses = processed.results.status;
const uniqueStatuses1 = statuses.filter((status, index) => {
  return index === statuses.indexOf(status);
}).sort();

console.log(uniqueUsernames1);
console.log(uniqueStatuses1);

// Processing Data 2

const removeDuplicates = (item, index, array) => {
  return index === array.indexOf(item);
};

const test1 = removeDuplicates('Bob', 0, ['Bob']);
console.log('expect', test1, ' toEqual true');
const test2 = removeDuplicates('Bob', 12, ['Bob']);
console.log('expect', test2, ' toEqual false');

const uniqueUsernames2 = usernames.filter(removeDuplicates).sort();
const uniqueStatuses2 = statuses.filter(removeDuplicates).sort();

console.log(uniqueUsernames2);
console.log(uniqueStatuses2);
