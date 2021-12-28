const input = require('./input.txt')
  .split('\n')
  .map((row) => row.split('').map((v) => ({ risk: Number(v) })))

const unvisited = []

// build graph
for (let i = 0; i < input.length; i++) {
  const row = input[i]
  for (let j = 0; j < row.length; j++) {
    const node = row[j]
    unvisited.push(node)
    node.pos = { x: i, y: j }
    node.neighbors = new Set()
    if (i > 0) node.neighbors.add(input[i - 1][j])
    if (j < row.length - 1) node.neighbors.add(input[i][j + 1])
    if (i < input.length - 1) node.neighbors.add(input[i + 1][j])
    if (j > 0) node.neighbors.add(input[i][j - 1])
  }
}

const source = input[0][0]
const lastRow = input[input.length - 1]
const target = lastRow[lastRow.length - 1]

const visited = new Set()
const table = new Map()

for (const node of unvisited) {
  table.set(node, { risk: Infinity, prev: null })
}

table.set(source, { risk: 0, prev: null })

for (let node of unvisited) {
  const storedCurrent = table.get(node)

  for (const neighbor of node.neighbors) {
    if (visited.has(neighbor)) continue
    const storedNeighbor = table.get(neighbor)
    const totalRisk = neighbor.risk + storedCurrent.risk
    if (storedNeighbor.risk > totalRisk) {
      storedNeighbor.risk = totalRisk
      storedNeighbor.prev = node
    }
  }

  visited.add(node)
}

console.log('risk:', table.get(target).risk)
