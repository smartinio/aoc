function contains(rangeA, rangeB) {
  const [startA, endA] = rangeA
  const [startB, endB] = rangeB
  return startA >= startB && endA <= endB
}

const result = require('./input.txt')
  .trim()
  .split('\n')
  .map((item) => item.split(','))
  .map((pair) => pair.map((range) => range.split('-').map(Number)))
  .filter(([a, b]) => contains(a, b) || contains(b, a)).length

console.log({ result })
