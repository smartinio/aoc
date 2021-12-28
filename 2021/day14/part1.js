const [start, ...input] = require('./input.txt').split('\n')
const rules = Object.fromEntries(input.map((rule) => rule.split(' -> ')))
let sequence = start.split('')

function add(object, key, value) {
  object[key] = (object[key] || 0) + value
}

for (let i = 0; i < 10; i++) {
  const next = [...sequence]

  let inserts = 0

  for (let j = 0; j < sequence.length - 1; j++) {
    const pair = sequence[j] + sequence[j + 1]
    if (rules[pair]) {
      next.splice(j + inserts + 1, 0, rules[pair])
      inserts += 1
    }
  }

  sequence = next
}

const counts = sequence.reduce((acc, val) => {
  add(acc, val, 1)
  return acc
}, {})

const sortedCounts = Object.values(counts).sort((a, b) => b - a)
const mostFrequent = sortedCounts.shift()
const leastFrequent = sortedCounts.pop()

console.log({ result: mostFrequent - leastFrequent })
