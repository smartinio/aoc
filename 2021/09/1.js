const input = require('./input.txt')
  .split('\n')
  .filter(Boolean)
  .map((r) => r.split('').map(Number))

console.log({ input })

let danger = 0

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const curr = input[i][j]

    const left = input[i][j - 1] === undefined ? Infinity : input[i][j - 1]
    const right = input[i][j + 1] === undefined ? Infinity : input[i][j + 1]
    const up = input[i - 1] === undefined ? Infinity : input[i - 1][j]
    const down = input[i + 1] === undefined ? Infinity : input[i + 1][j]

    if (curr < left && curr < right && curr < up && curr < down) {
      danger += curr + 1
    }
  }
}

console.log({ danger })
