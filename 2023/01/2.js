const input = require('./input.txt').split('\n')

const numbers = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}

const union = Object.entries(numbers).flat().join('|')
const regex = new RegExp(`^(${union})`)

const result = input
  .map((line) => {
    const found = []

    for (let i = 0; i < line.length; i++) {
      const slice = line.slice(i, i + 5)
      if ((match = slice.match(regex))) {
        found.push(match[0])
      }
    }

    const a = found[0]
    const b = found.pop()
    const first = numbers[a] ?? a
    const last = numbers[b] ?? b

    return first + last
  })
  .reduce((acc, n) => acc + Number(n), 0)

log({ result })
