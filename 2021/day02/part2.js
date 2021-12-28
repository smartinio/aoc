const input = require('./input.txt').split('\n')

let aim = 0
let horizontal = 0
let depth = 0

for (let i = 0; i < input.length; i++) {
  const value = input[i]
  if (!value) continue

  const [command, amountString] = value.split(' ')
  const amount = Number(amountString)

  switch (command) {
    case 'down':
      aim += amount
      break
    case 'up':
      aim -= amount
      break
    case 'forward':
      horizontal += amount
      depth += aim * amount
      break
  }
}

console.log(horizontal * depth)
