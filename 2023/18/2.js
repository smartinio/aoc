const dirs = ['R', 'D', 'L', 'U']

const deltas = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

const input = require('./input.txt')
  .split('\n')
  .map((x) => x.match(/[a-f0-9]{6}/g))
  .map(([hex]) => ({
    dir: dirs[parseInt(hex.slice(-1))],
    steps: parseInt(hex.slice(0, 5), 16),
  }))

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
