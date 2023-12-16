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

const queue = [[dir('right'), 0, 0]]
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

log({ result: energized.size })
