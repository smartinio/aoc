const input = require('./input.txt')
  .split('\n')
  .map((v) => v.split('').map((v) => ({ value: Number(v) })))

// build graph
for (let i = 0; i < input.length; i++) {
  const row = input[i]
  for (let j = 0; j < row.length; j++) {
    const node = row[j]
    node.up = i > 0 ? input[i - 1][j] : null
    node.right = j < row.length - 1 ? input[i][j + 1] : null
    node.down = i < input.length - 1 ? input[i + 1][j] : null
    node.left = j > 0 ? input[i][j - 1] : null
    node.upright = node.up && node.right ? input[i - 1][j + 1] : null
    node.upleft = node.up && node.left ? input[i - 1][j - 1] : null
    node.downright = node.down && node.right ? input[i + 1][j + 1] : null
    node.downleft = node.down && node.left ? input[i + 1][j - 1] : null
  }
}

let flashed = new Set()

function flash(node) {
  if (!node || flashed.has(node)) {
    return
  }
  flashed.add(node)
  increment(node.up)
  increment(node.upright)
  increment(node.right)
  increment(node.downright)
  increment(node.down)
  increment(node.downleft)
  increment(node.left)
  increment(node.upleft)
}

function increment(node) {
  if (!node || flashed.has(node)) {
    return
  }
  node.value += 1
  if (node.value === 10) {
    node.value = 0
    flash(node)
  }
}

let tick = 1
while (true) {
  flashed = new Set()
  for (const row of input) {
    for (const node of row) {
      increment(node)
    }
  }
  if (flashed.size === 100) {
    console.log({ firstStep: tick })
    break
  }
  tick++
}
