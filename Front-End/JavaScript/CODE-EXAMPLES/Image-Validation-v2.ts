
// image size, string bytes
// max size, 10mb or none
// 10kb, 10mb, 10gb

// COMPILE: tsc Image-Validation-v2.ts
// RUNNER: node Image-Validation-v2.js

interface Image {
  url: string;
  size: string;
}

const dataTS: Array<Image> = [
  { url: 'TRUE', size: "10230123" },
  { url: 'FALSE', size: "20230123" },
  { url: 'TRUE', size: "2048" },
  { url: 'TRUE', size: "1024" }
];

class ImageValidationTS {

  keySizes: { [key: string]: number } = {
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
    tb: 1024 * 1024 * 1024 * 1024
  };
  
  validate(images: Array<Image>, maxSize: string): Array<Image> {
    if (maxSize.toLowerCase() === 'none') return images;
    const regex: any = /(\d+)(kb|mb|gb|tb)/i;
    const [_, sizeString, type] = regex.exec(maxSize);
    const maxSizeInBytes: number = parseInt(sizeString) * this.keySizes[type];
    return images.filter(image => parseInt(image.size) <= maxSizeInBytes);
  }

}

const imageValidatorTS = new ImageValidationTS();

const valid4: Array<Image> = imageValidatorTS.validate(dataTS, 'none');
console.log('=== NONE ===');
console.log(valid4);

const valid5: Array<Image> = imageValidatorTS.validate(dataTS, '10mb');
console.log('=== 10mb ===');
console.log(valid5);

const valid6: Array<Image> = imageValidatorTS.validate(dataTS, '2kb');
console.log('=== 2kb ===');
console.log(valid6);
