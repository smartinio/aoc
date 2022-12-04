const input = require('./input.txt').split('\n')

const counts = Array.from({ length: input[0].length }, () => [0, 0])

for (const binary of input) {
  const bits = binary.split('').map(Number)
  for (let i = 0; i < bits.length; i++) {
    const bit = bits[i]
    counts[i][bit] += 1
  }
}

let gamma = ''
let epsilon = ''

for (let count of counts) {
  const mostCommon = count.indexOf(Math.max(count[0], count[1]))
  const leastCommon = 1 - mostCommon
  gamma += mostCommon
  epsilon += leastCommon
}

const epsilonDecimal = parseInt(epsilon, 2)
const gammaDecimal = parseInt(gamma, 2)
const consumption = epsilonDecimal * gammaDecimal

console.log({
  counts,
  epsilon,
  gamma,
  epsilonDecimal,
  gammaDecimal,
  consumption,
})
