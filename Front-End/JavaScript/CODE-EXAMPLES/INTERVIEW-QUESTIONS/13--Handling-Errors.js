
function isObject(val) {
  if (val === null) { return false;}
  return ( (typeof val === 'function') || (typeof val === 'object') );
}

const image1 = { name: 'BOB.jpg' };
const image2 = "ERROR: Authentication Wrong";

function checkImage1(image) {
  if (!!image) {
    console.log('image exists 1');
  } else {
    console.log('issue here 1');
  }
}

function checkImage2(image) {
  if (isObject(image) === true) {
    console.log('image exists 2');
  } else {
    console.log('issue here 2');
  }
}

checkImage1(image1);
checkImage2(image1);
checkImage1(image2);
checkImage2(image2);
