
// === Array.prototype.findLastIndex

const filename = 'another.xxxxxx.file.here.txt';
const filenameArray = filename.split('');

const lastIndex1 = filenameArray.findLastIndex((item) => item === '.');
const extension1 = filename.substring(lastIndex1);
console.log(lastIndex1);
console.log('.' + extension1 + '.');

const lastIndex2 = filename.lastIndexOf('.');
const extension2 = filename.substring(lastIndex2);
console.log('.' + extension2 + '.');

