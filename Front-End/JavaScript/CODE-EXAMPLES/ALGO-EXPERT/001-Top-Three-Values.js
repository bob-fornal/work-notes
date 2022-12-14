
/*
  FIND THREE LARGEST NUMBERS
  Write a function that takes an array of at least three integers and, without
  sorting the input array, returns a sorted array of the three largest integers
  in the input array.

  The function should return duplicate integers if necessary.
*/

function simpleTopThree(check) {
  // const checkNoDuplicates = [...new Set(check)];
  const sorted = check.sort((a, b) => b - a);
  sorted.length = 3;
  return sorted;
}

function findTopThree1(check) {
  let result = [];

  check.forEach((num) => {
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

function findTopThree2 (check) {
  const top1 = Math.max(...check);
  let index = check.indexOf(top1);
  check.splice(index, 1);

  const top2 = Math.max(...check);
  index = check.indexOf(top2);
  check.splice(index, 1);

  const top3 = Math.max(...check);
  
  return [top1, top2, top3];
}

function testFunctionality() {
  console.log('simple', simpleTopThree([1, 2, 3, -5, 122, 2000, 3]));
  console.log('three-1', findTopThree1([1, 2, 3, -5, 122, 2000, 3]));
  console.log('three-2', findTopThree2([1, 2, 3, -5, 122, 2000, 3]));
  console.log('three-1', findTopThree1([1, 2, 3, 3, 4, 4, 5, 6]));
  console.log('three-1', findTopThree1([6, 5, 4, 3, 2, 1]));
}
// testFunctionality();

const randomArray = (length, max) => [...new Array(length)]
    .map(() => Math.round(Math.random() * max));

const checkArray = randomArray(10_000_000, 10000);

function testTiming() {
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
  
  console.time('findTopThree2');
  for (let i = 0, len = iterations; i < len; i++) {
    findTopThree2(checkArray);
  }
  console.timeEnd('findTopThree2');  
}
testTiming();
