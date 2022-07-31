
// === Array.prototype.findIndex

const comments = 'Title (subtitle here)';
const commentsArray = comments.split('');
console.log(commentsArray);

const parenIndex1 = commentsArray.findIndex((item) => item === '(');
const subtitle1 = comments.substring(parenIndex1);
const title1 = comments.replace(' ' + subtitle1, '');
console.log(parenIndex1);
console.log('.' + subtitle1 + '.');
console.log('.' + title1 + '.');

const subtitle2 = comments.substring(comments.indexOf('('));
const title2 = comments.replace(' ' + subtitle2, '');
console.log('.' + subtitle2 + '.');
console.log('.' + title2 + '.');

