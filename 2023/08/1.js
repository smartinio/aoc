const input = require('./input.txt').split('\n\n')

const turns = input.at(0)

const nodes = input
  .at(1)
  .split('\n')
  .map((line) => line.match(/[A-Z]{3}/g))
  .reduce((acc, [id, L, R]) => acc.set(id, { L, R }), new Map())

const target = 'ZZZ'

let curr = 'AAA'
let steps = 0

while (curr !== target) {
  let turn = turns.at(steps % turns.length)
  curr = nodes.get(curr)[turn]
  steps++
}

log({ result: steps })
