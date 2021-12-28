const input = require('./input.txt').split(',').map(Number)
const [min] = [...input].sort((a, b) => a - b)
const [max] = [...input].sort((a, b) => b - a)

let lowestCost = Infinity
let winner = null

const partialSum = (n) => (n * (n + 1)) / 2

for (let i = min; i <= max; i++) {
  const cost = input.reduce((acc, n) => acc + partialSum(Math.abs(n - i)), 0)
  if (cost < lowestCost) {
    lowestCost = cost
    winner = i
  }
}

console.log({ lowestCost, winner })
