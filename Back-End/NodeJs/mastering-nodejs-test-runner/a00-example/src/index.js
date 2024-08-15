export function sum(numbers) {
  if (!Array.isArray(numbers)) {
    throw new Error('Input must be an array of numbers')
  }

  return numbers.reduce((acc, num) => acc + num, 0)
}

export function product(numbers) {
  if (!Array.isArray(numbers)) {
    throw new Error('Input must be an array of numbers')
  }

  return numbers.reduce((acc, num) => acc * num, 1)
}

export function average(numbers) {
  if (!Array.isArray(numbers)) {
    throw new Error('Input must be an array of numbers')
  }

  if (numbers.length === 0) {
    return 0
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0)
  return sum / numbers.length
}