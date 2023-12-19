const input = require('./input.txt')
  .split('\n\n')
  .map((b) => b.split('\n'))

const flows = input
  .at(0)
  .map((l) => l.split(/[\{\}]/).filter(Boolean))
  .map(([name, logic]) => [
    name,
    logic.split(',').map((r) => r.match(/[a-z0-9]+|[<>]|:/gi)),
  ])
  .map(([name, logic]) => {
    const conditions = logic
      .slice(0, -1)
      .map(([id, op, n, _, then]) => ({ id, op, n: Number(n), then }))

    const [final] = logic.slice(-1).flat()

    return [name, { conditions, final }]
  })
  .reduce((map, [name, flow]) => map.set(name, flow), new Map())

const queue = [[{ then: 'in' }]]
const paths = []

while (queue.length > 0) {
  const path = queue.pop()
  const last = path.at(-1).then

  if (last === 'A') {
    paths.push(path)
    continue
  }

  if (last === 'R') {
    continue
  }

  const flow = flows.get(last)
  const neighbors = flow.conditions.concat({ then: flow.final })

  for (const neighbor of neighbors) {
    queue.push(path.concat(neighbor))
  }
}

function getXmasRange(path) {
  const range = {
    x: { min: 1, max: 4000 },
    m: { min: 1, max: 4000 },
    a: { min: 1, max: 4000 },
    s: { min: 1, max: 4000 },
  }

  for (let i = 0; i < path.length; i++) {
    const key = path[i].then

    if (key === 'A') break

    const next = path[i + 1]
    const flow = flows.get(key)

    for (const cond of flow.conditions) {
      const { id, op, n } = cond

      if (cond === next) {
        if (op === '>') range[id].min = Math.max(range[id].min, n + 1)
        if (op === '<') range[id].max = Math.min(range[id].max, n - 1)
        break
      }

      if (op === '>') range[id].max = Math.min(range[id].max, n)
      if (op === '<') range[id].min = Math.max(range[id].min, n)
    }
  }

  return range
}

const result = paths
  .map(getXmasRange)
  .map(Object.values)
  .map((ranges) => ranges.map((v) => 1 + v.max - v.min))
  .map((count) => count.reduce((combs, n) => combs * n, 1))
  .reduce((sum, n) => sum + n, 0)

log({ result })
