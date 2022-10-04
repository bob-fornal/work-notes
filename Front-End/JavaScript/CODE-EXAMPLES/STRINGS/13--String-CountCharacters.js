
const image1 = [ 1, 1, 1, 0, 0, 0, 1, 1 ];
let image2 = [];

for (let i = 0, len = 10000000; i < len; i++) {
  image2.push(Math.random() >= 0.5 ? 1 : 0);
}

const numberOfZeros1 = (image) => {
  //     '12300011'      '000'
  return image
    .join('')
    .replace(/[^0]/g, '')
    .length;
};
const numberOfZeros2 = (image) => {
  let count = 0;
  for (let i = 0, len = image.length; i < len; i++) {
    if (image[i] === 0) count++;
  }
  return count;
};
const numberOfZeros3 = (image) => {
  let count = 0;
  image.forEach((item) => {
    if (item === 0) count++;
  });
  return count;
};

console.time('no for-loop');
console.log(numberOfZeros1(image2));
console.timeEnd('no for-loop');

console.time('traditional for-loop');
console.log(numberOfZeros2(image2));
console.timeEnd('traditional for-loop');

console.time('forEach');
console.log(numberOfZeros3(image2));
console.timeEnd('forEach');

