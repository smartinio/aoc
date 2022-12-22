const input = require('./input.txt')
  .split('\n')
  .map((r) => r.match(/[A-Z]{2}|\d+/g))
  .map(([id, flow, ...neighbors]) => ({
    id,
    flow: Number(flow),
    neighbors,
  }))
  .reduce((map, node) => map.set(node.id, node), new Map())

const nodes = [...input.values()]

// floyd-warshall
const createTimeChecker = () => {
  const min = nodes.reduce(
    (map, node) =>
      map.set(
        node,
        nodes.reduce((m, n) => m.set(n, Infinity), new Map())
      ),
    new Map()
  )

  for (const node of nodes)
    for (const neighborId of node.neighbors)
      min.get(node).set(input.get(neighborId), 1)

  for (const node of nodes) min.get(node).set(node, 1)

  for (let k of nodes)
    for (let i of nodes)
      for (let j of nodes)
        if (min.get(i).get(j) > min.get(i).get(k) + min.get(k).get(j))
          min.get(i).set(j, min.get(i).get(k) + min.get(k).get(j))

  return (a, b) => min.get(a).get(b)
}

const flowNodes = nodes.filter((n) => n.flow > 0)

const masks = flowNodes.reduce((map, n, i) => map.set(n, 1 << i), new Map())

const isOpen = (node, valves) => valves & masks.get(node)

const open = (node, valves) => valves | masks.get(node)

const time = createTimeChecker()

const cache = new Map()

const maxflow = (current, valves, t) => {
  if (t <= 1) return 0
  if (isOpen(current, valves)) return 0

  const key = [current.id, t, valves].join(':')

  if (cache.has(key)) return cache.get(key)

  // option a: skip room and go to other rooms directly
  const aFlows = flowNodes
    .filter((n) => n !== current)
    .map((node) => maxflow(node, valves, t - time(current, node)))

  // option b: open valve before going to other rooms
  const currentValveOpen = open(current, valves)
  const bFlows = flowNodes
    .filter((n) => n !== current)
    .map((node) => maxflow(node, currentValveOpen, t - 1 - time(current, node)))
    .map((flow) => current.flow * (t - 1) + flow)

  const bestFlow = Math.max(...aFlows, ...bFlows)
  cache.set(key, bestFlow)

  return bestFlow
}

let result = 0
const valves = (1 << flowNodes.length) - 1 // generates all 1s
const start = input.get('AA')

// half of all combinations * 2 actors = all combinations
for (let opened of range((valves + 1) / 2)) {
  const me = maxflow(start, opened, 26)
  const elephant = maxflow(start, valves ^ opened, 26)
  result = Math.max(result, me + elephant)
}

console.log({ result })
