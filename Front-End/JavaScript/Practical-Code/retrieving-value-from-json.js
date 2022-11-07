
const getValueFromJSON = (obj, path) => {
  return path
    .replace(/\[([^[\]]*)]/g, '.$1.')
    .split('.')
    .filter((prop) => prop !== '')
    .reduce(
      (previous, next) => (previous instanceof Object ? previous[next] : undefined), obj
    );
};

const data = {
  user: {
    job: {
      company: 'xxx',
      role: 'tech lead'
    },
    books: [
      'book1',
      'book2'
    ]
  }
};

console.log('user.job.role :', getValueFromJSON(data, 'user.job.role'));
console.log('user.books[1] :', getValueFromJSON(data, 'user.books[1]'));