
const filename1 = 'bob-fornal.png.png_abc';
const filename2 = 'bob-fornal.PNG';

console.log('1 - PNG', filename1.endsWith('.png'));
console.log('1 - JPG', filename1.endsWith('.jpg'));

console.log('2 - PNG', filename2.endsWith('.png'));
console.log('2 - JPG', filename2.endsWith('.jpg'));

console.log('---', filename1.indexOf('.png'));
console.log('---', filename1.lastIndexOf('.png'));
