
/*
  Finding the top three values from an array without sorting.
  Receives three integers minimum, no duplicate values.
  Returns an array of three integers.
*/

function simpleTopThree(check) {
  const checkNoDuplicates = [...new Set(check)];
  const sorted = checkNoDuplicates.sort((a, b) => b - a);
  sorted.length = 3;
  return sorted;
}

function findTopThree2(check) {
  let checkNoDuplicates = [...new Set(check)].sort((a, b) => b - a);

  checkNoDuplicates.length = 3;
  return checkNoDuplicates;
}

function findTopThree1(check) {
  let result = [];

  let checkNoDuplicates = [...new Set(check)];
  checkNoDuplicates.forEach((num) => {
    if (result.length === 0) {
      result.push(num);
    } else {
      let inserted = false;
      for (let i = 0, len = result.length; i < len; i++) {
        if (num > result[i]) {
          inserted = true;
          result.splice(i, 0, num);
          break;
        }
      }
      if (inserted === false) {
        result.push(num);
      }
    }
  });

  result.length = 3;
  return result;
}

function findTopThree3 (check) {
  let checkNoDuplicates = [...new Set(check)];

  const top1 = Math.max(...checkNoDuplicates);
  let index = checkNoDuplicates.indexOf(top1);
  checkNoDuplicates.splice(index, 1);

  const top2 = Math.max(...checkNoDuplicates);
  index = checkNoDuplicates.indexOf(top1);
  checkNoDuplicates.splice(index, 1);

  const top3 = Math.max(...checkNoDuplicates);
  
  return [top1, top2, top3];
}


// console.log(simpleTopThree([1, 2, 3, -5, 122, 2000, 3]));
// console.log(findTopThree1([1, 2, 3, -5, 122, 2000, 3]));
// console.log(findTopThree3([1, 2, 3, -5, 122, 2000, 3]));
// console.log(findTopThree1([1, 2, 3, 3, 4, 4, 5, 6]));
// console.log(findTopThree1([6, 5, 4, 3, 2, 1]));

const randomArray = (length, max) => [...new Array(length)]
    .map(() => Math.round(Math.random() * max));

const checkArray = randomArray(100, 10000);
console.log(checkArray);
const iterations = 1_000_000;
console.time('simpleTopThree');
for (let i = 0, len = iterations; i < len; i++) {
  simpleTopThree(checkArray);
}
console.timeEnd('simpleTopThree');

console.time('findTopThree1');
for (let i = 0, len = iterations; i < len; i++) {
  findTopThree1(checkArray);
}
console.timeEnd('findTopThree1');

console.time('findTopThree3');
for (let i = 0, len = iterations; i < len; i++) {
  findTopThree3(checkArray);
}
console.timeEnd('findTopThree3');
