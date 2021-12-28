const input = require('./input.txt').split('\n')

const { horizontal, depth } = input.reduce(
  (acc, value) => {
    if (!value) return acc

    const [command, amountString] = value.split(' ')
    const amount = Number(amountString)

    switch (command) {
      case 'forward':
        acc.horizontal += amount
        break
      case 'up':
        acc.depth -= amount
        break
      case 'down':
        acc.depth += amount
        break
    }

    return acc
  },
  { horizontal: 0, depth: 0 }
)

console.log(horizontal * depth)
