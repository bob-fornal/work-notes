import { average, sum, product } from '../src/index.js'
import { test } from 'node:test'
import assert from 'node:assert'

test('sum', () => {
  assert.deepStrictEqual(sum([1, 2, 3]), 6, 'sum of [1, 2, 3] is 6')
  assert.deepStrictEqual(sum([]), 0, 'sum of empty array is 0')
  assert.throws(
    () => sum('abc'),
    { message: 'Input must be an array of numbers' },
    'throws error for non-array input in sum'
  )
})

test('product', () => {
  assert.strictEqual(product([2, 3, 4]), 24, 'product of [2, 3, 4] is 24')
  assert.strictEqual(product([]), 1, 'product of empty array is 1')
  assert.throws(
    () => product('abc'),
    { message: 'Input must be an array of numbers' },
    'throws error for non-array input in product'
  )
})

test('average', () => {
  assert.strictEqual(average([1, 2, 3]), 2, 'average of [1, 2, 3] is 2')
  assert.strictEqual(average([]), 0, 'average of empty array is 0')
  assert.throws(
    () => average(null),
    { message: 'Input must be an array of numbers' },
    'throws error for non-array input in average'
  )
})