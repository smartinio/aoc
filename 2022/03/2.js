const input = require('./input.txt')

const priority = Object.fromEntries(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    .split('')
    .map((val, i) => [val, i + 1])
)

const result = input
  .split('\n')
  .flatMap((_, i, list) => {
    if (i % 3 !== 0) return []
    return [[list[i], list[i + 1], list[i + 2]]]
  })
  .map((data) => data.map((x) => x.split('')))
  .map(([a, b, c]) => [a, new Set(b), new Set(c)])
  .map(([list, setA, setB]) => list.find((x) => setA.has(x) && setB.has(x)))
  .map((letter) => priority[letter])
  .reduce((a, b) => a + b, 0)

console.log({ result })
