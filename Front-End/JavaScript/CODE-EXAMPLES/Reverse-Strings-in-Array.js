
const original = ['ayliA', 'biaohS', 'badahS', 'anibuR', 'sifaN'];

const reverseInPlace = (origin) => {
	const str = origin.join('~~');
  const split = str.split('');
  const reverse = split.reverse().join('');
  const result = reverse.split('~~');
  return result;
};

const result = reverseInPlace(original);
console.log({ result });
