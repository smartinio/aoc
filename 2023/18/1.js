const dirs = ['R', 'D', 'L', 'U']

const deltas = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

const input = require('./input.txt')
  .split('\n')
  .map((x) => x.match(/[A-Za-z0-9]+/g))
  .map(([dir, steps]) => ({ dir, steps: Number(steps) }))

let x = 0
let y = 0
let deltaSum = 0

for (let { dir, steps } of input) {
  const d = dirs.indexOf(dir)
  const [dx, dy] = deltas[d]
  const [nx, ny] = [x + dx * steps, y + dy * steps]

  deltaSum += x * ny - y * nx // area of coordinates formula
  deltaSum += steps // accounts for perimeter

  x = nx
  y = ny
}

const result = 1 + Math.abs(deltaSum / 2)

log({ result })
