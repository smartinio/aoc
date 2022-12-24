const [map, path] = require('./input.txt').split('\n\n')
const { mappings, N } = require('./2.mappings')
const lines = map.split('\n')

const moves = path
  .replace(/(L|R)/g, ' $1 ')
  .split(' ')
  .map((x) => (isNaN(x) ? x : Number(x)))

const rowLength = Math.max(...lines.map((line) => line.length))

const grid = lines
  .map((line) => line.padEnd(rowLength, ' ').split(''))
  .map((tiles, y) => tiles.map((value, x) => ({ x, y, value, edges: {} })))

const faces = []

for (let y = 0; y < grid.length; y += N) {
  for (let x = 0; x < grid[y].length; x += N) {
    const node = grid[y][x]
    if (node.value === ' ') continue
    const face = grid.slice(y, y + N).map((row) => row.slice(x, x + N))
    faces.push(face)
  }
}

const buildEdge = (maybeNode, mapping) => {
  return {
    next: maybeNode ?? faces[mapping.face - 1][mapping.y][mapping.x],
    newFacing: maybeNode ? null : mapping.facing,
  }
}

for (let f = 1; f <= faces.length; f++) {
  const face = faces[f - 1]

  for (let y = 0; y < face.length; y++) {
    for (let x = 0; x < face[y].length; x++) {
      const node = face[y][x]

      if (node.value !== '.') continue

      const mapping = mappings({ x, y, f })

      node.edges['>'] = buildEdge(face[y][x + 1], mapping['>'])
      node.edges['<'] = buildEdge(face[y][x - 1], mapping['<'])
      node.edges['v'] = buildEdge(face[y + 1]?.[x], mapping['v'])
      node.edges['^'] = buildEdge(face[y - 1]?.[x], mapping['^'])
    }
  }
}

const walk = (node, facing, steps) => {
  while (steps > 0) {
    const { next, newFacing } = node.edges[facing]
    if (next.value !== '.') break
    steps--
    node = next
    facing = newFacing ?? facing
  }

  return { node, facing }
}

const TURNS = {
  L: {
    '>': '^',
    '^': '<',
    '<': 'v',
    v: '>',
  },
  R: {
    '>': 'v',
    '^': '>',
    '<': '^',
    v: '<',
  },
}

let facing = '>'
let current = grid[0].find((tile) => tile.value === '.')

for (let value of moves) {
  if (isNaN(value)) {
    facing = TURNS[value][facing]
  } else {
    result = walk(current, facing, value)
    current = result.node
    facing = result.facing
  }
}

const password =
  1000 * (current.y + 1) +
  4 * (current.x + 1) +
  ['>', 'v', '<', '^'].indexOf(facing)

console.log({ result: password })
