const input = require('./input.txt')

const priority = Object.fromEntries(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    .split('')
    .map((val, i) => [val, i + 1])
)

const result = input
  .split('\n')
  .map((items) => [
    items.slice(0, items.length / 2).split(''),
    items.slice(items.length / 2, items.length).split(''),
  ])
  .map(([left, right]) => [left, new Set(right)])
  .map(([list, set]) => list.find((x) => set.has(x)))
  .map((letter) => priority[letter])
  .reduce((a, b) => a + b, 0)

console.log({ result })
