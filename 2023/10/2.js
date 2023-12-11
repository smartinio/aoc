/** Data */

const input = require('./input.txt')
  .split('\n')
  .map((l, i) => l.split('').map((shape, j) => ({ i, j, shape, dirs: {} })))

const flatInput = input.flat()

// Which directions can shapes connect from?
const valid = {
  L: ['-', 'F', 'L'], // Left
  R: ['-', 'J', '7'], // Right
  U: ['|', 'F', '7'], // Up
  D: ['|', 'L', 'J'], // Down
}

const { L, R, U, D } = valid

// Which shapes can connect via these directions?
const connections = {
  F: { R, D },
  7: { L, D },
  J: { U, L },
  L: { U, R },
  '-': { L, R },
  '|': { U, D },
}

// Index manipulation helpers by direction
const dirs = {
  L: [0, -1],
  R: [0, 1],
  U: [-1, 0],
  D: [1, 0],
}

// Given a shape, and coming from a direction, which directions are on my inside?
const bounds = {
  F: {
    D: ['L', 'U'],
    R: [],
  },
  7: {
    D: [],
    L: ['R', 'U'],
  },
  J: {
    U: ['R', 'D'],
    L: [],
  },
  L: {
    U: [],
    R: ['L', 'D'],
  },
  '-': {
    L: ['U'],
    R: ['D'],
  },
  '|': {
    D: ['L'],
    U: ['R'],
  },
}

/** Helpers */

const spreadQueue = []

// Takes a pair of coordinates and if the node is marked "inside", spreads the mark to neighbors repeatedly
function processSpreadQueue() {
  while (spreadQueue.length > 0) {
    const j = spreadQueue.pop()
    const i = spreadQueue.pop()

    const node = input[i][j]

    if (node.loop || node.spread || !node.inside) continue

    node.spread = true

    for (const [ix, jx] of Object.values(dirs)) {
      const neighbor = input[i + ix]?.[j + jx]
      if (!neighbor || neighbor.loop || neighbor.spread) continue
      neighbor.inside = true
      spreadQueue.push(neighbor.i, neighbor.j)
    }
  }
}

function walkPipes(cb) {
  let [key, otherKey] = Object.keys(start.dirs)
  let curr = start
  let prev = start.dirs[otherKey]

  do {
    cb(curr, prev)
    prev = curr
    curr = curr.dirs[key]
    key = Object.entries(curr.dirs).find(([_, node]) => node !== prev)[0]
  } while (curr !== start)
}

/** Result */

const start = flatInput.find((node) => node.shape === 'S')

for (const [dir, [ix, jx]] of Object.entries(dirs)) {
  const { i, j } = start
  const other = input[i + ix]?.[j + jx]

  if (!(other?.shape in connections)) continue
  if (!valid[dir].includes(other?.shape)) continue

  start.dirs[dir] = other
}

// Update start node with correct shape
const [startShape] = Object.entries(connections).find(([_key, conns]) =>
  Object.keys(conns).every((key) => Object.keys(start.dirs).includes(key))
)

start.shape = startShape

// Update rest of grid with connections
for (const node of flatInput) {
  if (!(node.shape in connections)) continue

  const directions = connections[node.shape]

  for (const [dir, [ix, jx]] of Object.entries(dirs)) {
    const { i, j } = node
    const other = input[i + ix]?.[j + jx]

    if (!(dir in directions)) continue
    if (!directions[dir].includes(other?.shape)) continue

    node.dirs[dir] = other
  }
}

// Follow the pipes from start and mark traversed pipes as part of loop
// This is to distinguish the loop from random pipes when marking inside/outside later
walkPipes((pipe) => {
  pipe.loop = true
})

// Walk the loop again, but this time mark adjacent tiles with inside/outside
walkPipes((pipe, prev) => {
  const { i, j } = pipe
  const otherDirs = Object.keys(dirs).filter((dir) => !(dir in pipe.dirs))

  otherDirs.forEach((dir) => {
    const [ix, jx] = dirs[dir]
    const other = input[i + ix]?.[j + jx]

    if (!other || other.loop) return

    const [fromDir] = Object.entries(pipe.dirs).find(([_, p]) => p === prev)
    const inside = bounds[pipe.shape][fromDir]

    if (inside.includes(dir)) other.inside = true
  })
})

// Find marked tiles and queue them to spread their mark to their neighbors
const nonSpreads = flatInput.filter((tile) => tile.inside && !tile.spread)

for (const ns of nonSpreads) {
  spreadQueue.push(ns.i, ns.j)
}

processSpreadQueue()

// Count number of inside tiles
const result = flatInput.filter((tile) => tile.inside).length

log({ result })
