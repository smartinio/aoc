/** Data */

const input = require('./input.txt').split('\n\n')

const turns = input.at(0)

const nodes = input
  .at(1)
  .split('\n')
  .map((line) => line.match(/[A-Z0-9]{3}/g))
  .reduce((acc, [id, L, R]) => acc.set(id, { L, R }), new Map())

const nodeIds = [...nodes.keys()]

const starts = nodeIds.filter((id) => id.endsWith('A'))

/** Helpers */

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b)
}

function lcm(a, b) {
  return (a * b) / gcd(a, b)
}

function lcd(values) {
  return values.reduce((a, b) => lcm(a, b))
}

/** Result */

for (const nodeId of starts) {
  let curr = nodeId
  let steps = 0

  while (!curr.endsWith('Z')) {
    let turn = turns.at(steps % turns.length)
    curr = nodes.get(curr)[turn]
    steps++
  }

  nodes.get(nodeId).steps = steps
}

const allSteps = starts.map((c) => nodes.get(c).steps)

const result = lcd(allSteps)

log({ result })
