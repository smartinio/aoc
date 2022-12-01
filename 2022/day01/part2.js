const sum = (acc, x) => acc + x

const result = require('./input.txt')
  .split('\n\n')
  .map((x) => x.split('\n').map(Number).reduce(sum, 0))
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce(sum, 0)

console.log({ result })
