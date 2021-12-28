const input = require('./input.txt')
  .split('\n')
  .filter(Boolean)
  .map((r) => r.split('').map((v) => (v === '9' ? null : { value: Number(v) })))

// Build graph
for (let i = 0; i < input.length; i++) {
  const row = input[i]
  for (let j = 0; j < row.length; j++) {
    const node = row[j]
    if (node) {
      node.up = i > 0 ? input[i - 1][j] : null
      node.right = j < row.length - 1 ? input[i][j + 1] : null
      node.down = i < input.length - 1 ? input[i + 1][j] : null
      node.left = j > 0 ? input[i][j - 1] : null
    }
  }
}

function traverse(node, direction, basin) {
  if (node[direction] && !basin.has(node[direction])) {
    basin.add(node[direction])
    findConnectedNodes(node[direction], basin)
  }
}

function findConnectedNodes(node, basin) {
  traverse(node, 'up', basin)
  traverse(node, 'right', basin)
  traverse(node, 'down', basin)
  traverse(node, 'left', basin)
}

const basins = []

for (let i = 0; i < input.length; i++) {
  const row = input[i]
  for (let j = 0; j < row.length; j++) {
    const node = row[j]
    if (node && !basins.some((basin) => basin.has(node))) {
      const basin = new Set()
      findConnectedNodes(node, basin)
      basins.push(basin)
    }
  }
}

const [a, b, c] = basins
  .map((basin) => Array.from(basin.values()).map((v) => v.value))
  .sort((a, b) => b.length - a.length)
  .slice(0, 3)
  .map((v) => v.length)

console.log(a * b * c)
