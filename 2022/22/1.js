const [map, path] = require('./input.txt').split('\n\n')
const lines = map.split('\n')

const moves = path
  .replace(/(L|R)/g, ' $1 ')
  .split(' ')
  .map((x) => (isNaN(x) ? x : Number(x)))

const rowLength = Math.max(...lines.map((line) => line.length))

const grid = lines
  .map((line) => line.padEnd(rowLength, ' ').split(''))
  .map((tiles, y) => tiles.map((value, x) => ({ x, y, value, edges: {} })))

const transpose = (matrix) => {
  return matrix[0].map((_, column) => matrix.map((row) => row[column]))
}

const nonEmpty = (node) => {
  if (node?.value !== ' ') return node
}

const addEdges = (grid, [right, left]) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const node = grid[y][x]
      if (node.value !== '.') continue
      node.edges[right] = nonEmpty(grid[y][x + 1]) ?? grid[y].find(nonEmpty)
      node.edges[left] = nonEmpty(grid[y][x - 1]) ?? grid[y].findLast(nonEmpty)
    }
  }
}

addEdges(grid, ['>', '<'])
addEdges(transpose(grid), ['v', '^'])

const walk = (node, facing, steps) => {
  while (steps > 0) {
    const next = node.edges[facing]
    if (next.value !== '.') break
    steps--
    node = next
  }

  return node
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

for (let move of moves) {
  if (isNaN(move)) {
    facing = TURNS[move][facing]
  } else {
    current = walk(current, facing, move)
  }
}

const password =
  1000 * (current.y + 1) +
  4 * (current.x + 1) +
  ['>', 'v', '<', '^'].indexOf(facing)

console.log({ result: password })
