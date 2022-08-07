
const string1 = 'BOB';
const string2 = 'FORNAL';

const strings = [ string1, string2 ];

console.log(string1.concat(' ').concat(string2));
console.log(string1 + ' ' + string2);
console.log(`${ string1 } ${ string2 }`);
console.log(strings.join(' '));

console.log(strings.join(', '));

