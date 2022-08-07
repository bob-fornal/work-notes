
const string1 = 'This Is A Test Case AABBAACC';

// .indexOf(searchString)
// .indexOf(searchString, position)

console.log(string1.indexOf('AA'));
console.log(string1.indexOf('AA'));
console.log(string1.indexOf('ZZ'));

const firstIndex = string1.indexOf('AA');
console.log(firstIndex);
const secondIndex = string1.indexOf('AA', firstIndex + 1);
console.log(secondIndex);

console.log(string1.includes('ZZ'));
console.log(string1.indexOf('ZZ') !== -1);

