const input = require('./input.txt').split('\n').map(Number)
let count = 0

for (let i = 0; i < input.length; i++) {
  const a = input[i]
  const b = input[i + 1]
  const c = input[i + 2]
  const d = input[i + 3]

  if (
    a !== undefined &&
    b !== undefined &&
    c !== undefined &&
    d !== undefined
  ) {
    if (a + b + c < b + c + d) {
      count++
    }
  }
}

console.log(count)
