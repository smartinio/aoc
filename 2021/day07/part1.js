const input = require('./input.txt').split(',').map(Number)
const [min] = [...input].sort((a, b) => a - b)
const [max] = [...input].sort((a, b) => b - a)

console.log({ min, max })

let lowestCost = Infinity
let winner = null

for (let i = min; i <= max; i++) {
  const cost = input.reduce((acc, n) => acc + Math.abs(n - i), 0)
  console.log({ i, cost })
  if (cost < lowestCost) {
    lowestCost = cost
    winner = i
  }
}

console.log({ lowestCost, winner })
