
// image size, string bytes
// max size, 10mb or none
// 10kb, 10mb, 10gb

// RUNNER: node Image-Validation-v1.js

const data1 = [
  { url: 'TRUE', size: "10230123" },
  { url: 'FALSE', size: "20230123" },
  { url: 'TRUE', size: "2048" },
  { url: 'TRUE', size: "1024" }
];

class ImageValidator {

  keySizes = {
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
    tb: 1024 * 1024 * 1024 * 1024,
  };
  
  
  validate(images, maxSize) {
    if (maxSize.toLowerCase() === 'none') return images;
    const regex = /(\d+)(kb|mb|gb|tb)/i;
    const [_, sizeString, type] = regex.exec(maxSize);
    const maxSizeInBytes = parseInt(sizeString) * this.keySizes[type];
    return images.filter(image => parseInt(image.size) <= maxSizeInBytes);
  }
  
}

const imageValidator = new ImageValidator();

const valid1 = imageValidator.validate(data1, 'none');
console.log('=== NONE ===');
console.log(valid1);

const valid2 = imageValidator.validate(data1, '10mb');
console.log('=== 10mb ===');
console.log(valid2);

const valid3 = imageValidator.validate(data1, '2kb');
console.log('=== 2kb ===');
console.log(valid3);
