const input = require('./input.txt')
  .split('\n')
  .map((x) => x.split(''))

const dirs = ['left', 'right', 'up', 'down']

const deltas = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]

const rules = {
  '.': (d) => [d],
  '-': (d) => (['left', 'right'].includes(d) ? [d] : ['left', 'right']),
  '|': (d) => (['up', 'down'].includes(d) ? [d] : ['up', 'down']),
  '/': (d) => [{ left: 'down', right: 'up', up: 'right', down: 'left' }[d]],
  '\\': (d) => [{ left: 'up', right: 'down', up: 'left', down: 'right' }[d]],
}

function dir(x) {
  return dirs.indexOf(x)
}

function hash(...ints) {
  return ints.reduce((key, int, i) => key | (int << (i * 10)))
}

function beam(start) {
  const queue = [start]

  const energized = new Set()
  const paths = new Set()

  while (queue.length > 0) {
    const [direction, x, y] = queue.pop()
    const curr = input[y]?.[x]

    if (!curr) continue

    const path = hash(direction, x, y)
    const tile = hash(x, y)

    if (paths.has(path)) continue

    energized.add(tile)
    paths.add(path)

    const currDir = dirs[direction]

    for (const next of rules[curr](currDir)) {
      const nextDir = dir(next)
      const [dx, dy] = deltas[nextDir]
      const [xn, yn] = [x + dx, y + dy]
      queue.push([nextDir, xn, yn])
    }
  }

  return energized.size
}

let max = 0

function findMax(start, x, y) {
  const energized = beam([dir(start), x, y])
  max = Math.max(max, energized)
}

input.at(0).forEach((_, x) => findMax('down', x, 0))
input.at(-1).forEach((_, x) => findMax('up', x, 0))
input.map((r) => r.at(0)).forEach((_, y) => findMax('right', 0, y))
input.map((r) => r.at(-1)).forEach((_, y) => findMax('left', 0, y))

log({ result: max })
