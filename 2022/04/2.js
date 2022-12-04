function overlaps(rangeA, rangeB) {
  const [startA, endA] = rangeA
  const [startB] = rangeB
  return startA <= startB && endA >= startB
}

const result = require('./input.txt')
  .trim()
  .split('\n')
  .map((item) => item.split(','))
  .map((pair) => pair.map((range) => range.split('-').map(Number)))
  .filter(([a, b]) => overlaps(a, b) || overlaps(b, a)).length

console.log({ result })
