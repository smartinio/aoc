const PriorityQueue = require('./priorityQueue')

const increaseRisk = (row, index) =>
  row.map((n) => n + index).map((risk) => (risk < 10 ? risk : (risk % 10) + 1))

const input = Array.from({ length: 5 }, (_, index) => {
  return require('fs')
    .readFileSync('./input.txt', 'utf8')
    .split('\n')
    .map((row) => row.split('').map(Number))
    .map((row) =>
      Array.from({ length: 5 }, (_, index) => increaseRisk(row, index)).flat()
    )
    .map((row) => increaseRisk(row, index))
})
  .flat()
  .map((row) => row.map((risk) => ({ risk })))

const table = new Map()
const unvisited = new PriorityQueue()

// build graph
for (let i = input.length - 1; i >= 0; i--) {
  const row = input[i]
  for (let j = row.length - 1; j >= 0; j--) {
    const node = row[j]
    unvisited.enqueue(node)
    table.set(node, { lowest: Infinity, prev: null })
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
table.get(source).lowest = 0

while (unvisited.hasMore) {
  const current = unvisited.dequeue()
  const storedCurrent = table.get(current)

  for (const neighbor of current.neighbors) {
    if (visited.has(neighbor)) continue
    const storedNeighbor = table.get(neighbor)
    const newRisk = neighbor.risk + storedCurrent.lowest
    if (newRisk < storedNeighbor.lowest) {
      unvisited.setPriority(neighbor, newRisk)
      storedNeighbor.lowest = newRisk
      storedNeighbor.prev = current
    }
  }

  visited.add(current)
}

console.log('risk:', table.get(target).lowest)
