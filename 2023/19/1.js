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

const parts = input.at(1).map((l) => {
  const entries = l
    .match(/[a-z]=\d+/gi)
    .map((l) => l.split('='))
    .map(([key, value]) => [key, Number(value)])

  return Object.fromEntries(entries)
})

const finals = parts.map((part) => {
  let flow = flows.get('in')

  while (true) {
    let next

    for (const { id, op, n, then } of flow.conditions) {
      const value = part[id]
      if (op === '<' && value < n) next = then
      if (op === '>' && value > n) next = then
      if (next) break
    }

    const result = next ?? flow.final

    flow = flows.get(result)

    if (!flow) return { part, result }
  }
})

const result = finals
  .filter((p) => p.result === 'A')
  .flatMap((p) => Object.values(p.part))
  .reduce((sum, n) => sum + n, 0)

log({ result })
