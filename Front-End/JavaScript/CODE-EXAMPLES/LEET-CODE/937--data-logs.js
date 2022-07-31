
const logs1 = [
  "dig1 8 1 5 1",
  "zzz2 art can",
  "let1 art can",
  "dig2 3 6",
  "let3 own kit dig",
  "let4 art zero"
];
const logs2 = [
  "a1 9 2 3 1",
  "g1 act car",
  "zo4 4 7",
  "ab1 off key dog",
  "a8 act zoo"
];

/**
 * @param {string[]} logs
 * @return {string[]}
 */
const reorderLogFiles = function(logs) {
  
  const letter = logs.filter((log) => {
    return isStringDigits(log) === false;
  }); //.sort(letterSort);

  const digit = logs.filter((log) => {
    return isStringDigits(log) === true;
  });

  return [ ...letter, ...digit ];
};

function isStringDigits (str) {
  const split = str.split(' ');
  const remainder = split.filter((_, index) => index > 0);
  const isDigits = remainder.every((item) => {
    return !isNaN(item);
  });
  return isDigits;
}

function isStringDigits2 (str) {
  const content = splitString(str).contents.replace(' ', '');
  return !isNaN(content);
}

function letterSort(a, b) {
  const aPart = splitString(a);
  const bPart = splitString(b);

  if (aPart.contents < bPart.contents) return -1;
  if (aPart.contents > bPart.contents) return 1;
  if (aPart.identifier < bPart.identifier) return -1;
  if (aPart.identifier > bPart.identifier) return 1;
}

function splitString (str) {
  const spaceIndex = str.indexOf(' ');
  const identifier = str.substring(0, spaceIndex);
  return {
    identifier: identifier,
    contents: str.replace(identifier + ' ', '')
  };
}

console.log(reorderLogFiles(logs1));
console.log(reorderLogFiles(logs2));
