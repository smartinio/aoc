const [rawCrateData, rawMoves] = require('./input.txt')
  .trimEnd()
  .split(/\n\n/)
  .map((part) => part.split('\n'))

const crates = rawCrateData.slice(0, -1)

const cratePositions = rawCrateData.slice(-1)[0]

const crateNumberByIndex = {}
{
  const numberRegex = /\d/g
  let crateNumbers

  while ((crateNumbers = numberRegex.exec(cratePositions)) !== null) {
    crateNumberByIndex[numberRegex.lastIndex] = crateNumbers[0]
  }
}

const stacks = crates.reverse().reduce((acc, crate) => {
  const crateRegex = /([A-Z])/g
  let crateIds

  while ((crateIds = crateRegex.exec(crate)) !== null) {
    const crateNumber = crateNumberByIndex[crateRegex.lastIndex]
    acc[crateNumber] = acc[crateNumber] || []
    acc[crateNumber].push(crateIds[0])
  }

  return acc
}, {})

for (const rawMove of rawMoves) {
  const amount = Number(rawMove.match(/\d+/)[0])
  const [from, to] = rawMove.split(' from ')[1].split(' to ')

  for (let i = 0; i < amount; i++) {
    const crate = stacks[from].pop()
    stacks[to].push(crate)
  }
}

const result = Object.values(stacks).reduce(
  (message, stack) => message + stack[stack.length - 1],
  ''
)

console.log({ result })
