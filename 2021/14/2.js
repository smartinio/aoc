const [start, ...input] = require('./input.txt').split('\n')
const rules = Object.fromEntries(input.map((rule) => rule.split(' -> ')))
const sequence = start.split('')
const pairs = {}

function add(object, key, value) {
  object[key] = (object[key] || 0) + value
}

for (let j = 0; j < sequence.length - 1; j++) {
  const pair = sequence[j] + sequence[j + 1]
  add(pairs, pair, 1)
}

const counts = sequence.reduce((acc, val) => {
  add(acc, val, 1)
  return acc
}, {})

for (let i = 0; i < 40; i++) {
  const deltas = {}

  Object.entries(pairs).forEach(([pair, count]) => {
    if (!rules[pair]) return

    const [a, b] = pair.split('')
    const letter = rules[pair]
    const p1 = a + letter
    const p2 = letter + b

    add(deltas, p1, count)
    add(deltas, p2, count)
    add(deltas, pair, -count)
    add(counts, letter, count)
  })

  Object.entries(deltas).forEach(([pair, count]) => {
    add(pairs, pair, count)
  })
}

const sortedCounts = Object.values(counts).sort((a, b) => b - a)
const mostFrequent = sortedCounts.shift()
const leastFrequent = sortedCounts.pop()

console.log({ result: mostFrequent - leastFrequent })
