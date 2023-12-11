const input = require('./input.txt')
  .split('\n')
  .map((l) => l.split('').map((shape) => ({ shape, dirs: {} })))

const valid = {
  L: ['-', 'F', 'L'],
  R: ['-', 'J', '7'],
  U: ['|', 'F', '7'],
  D: ['|', 'L', 'J'],
}

const { L, R, U, D } = valid

const connx = {
  F: { R, D },
  7: { L, D },
  J: { U, L },
  L: { U, R },
  '-': { L, R },
  '|': { U, D },
}

const dirs = {
  L: [0, -1],
  R: [0, 1],
  U: [-1, 0],
  D: [1, 0],
}

let start

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const node = input[i][j]

    if (node.shape === 'S') {
      start = node

      for (const [dir, [ix, jx]] of Object.entries(dirs)) {
        const other = input[i + ix]?.[j + jx]

        if (!(other?.shape in connx)) continue
        if (!valid[dir].includes(other?.shape)) continue

        node.dirs[dir] = other
      }

      break
    }
  }
}

const [startShape] = Object.entries(connx).find(([_key, conns]) =>
  Object.keys(conns).every((key) => Object.keys(start.dirs).includes(key))
)

start.shape = startShape

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const node = input[i][j]

    if (!(node.shape in connx)) continue

    const nodecon = connx[node.shape]

    for (const [dir, [ix, jx]] of Object.entries(dirs)) {
      const other = input[i + ix]?.[j + jx]

      if (!(dir in nodecon)) continue
      if (!nodecon[dir].includes(other?.shape)) continue

      node.dirs[dir] = other
    }
  }
}

let [key] = Object.keys(start.dirs)
let curr = start
let steps = 0
let prev

do {
  prev = curr
  curr = curr.dirs[key]
  key = Object.entries(curr.dirs).find(([_, node]) => node !== prev)[0]
  steps++
} while (curr !== start)

const result = Math.ceil(steps / 2)

log({ result })
