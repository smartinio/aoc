let input = require('./input.txt').split(',').map(Number)

let cycles = [0, 0, 0, 0, 0, 0, 0, 0, 0]

input.forEach((cycle) => {
  cycles[cycle] += 1
})

for (let i = 0; i < 256; i++) {
  const cycle = cycles.shift()
  cycles[6] += cycle
  cycles.push(cycle)
}

const total = cycles.reduce((acc, c) => acc + c, 0)

console.log(total)
