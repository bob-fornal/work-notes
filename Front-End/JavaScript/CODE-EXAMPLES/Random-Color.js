
const getRandomHex = (max = 0xFFFFFF) => `#${ Math.floor(Math.random() * max).toString(16).padStart(6, 0)}`;

const hexColor = getRandomHex();
console.log(hexColor);
