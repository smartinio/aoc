const { MinPriorityQueue } = require('@datastructures-js/priority-queue')

const input = require('./input.txt')
  .split('\n')
  .map((line, y) =>
    line
      .split('')
      .map(Number)
      .map((loss, x) => ({ x, y, loss, incurred: new Map() }))
  )

const dirs = ['left', 'right', 'up', 'down']

const deltas = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]

function opposite(dir) {
  if (dir === 'left') return 'right'
  if (dir === 'right') return 'left'
  if (dir === 'up') return 'down'
  if (dir === 'down') return 'up'
}

function dir(x) {
  return dirs.indexOf(x)
}

function hash(...ints) {
  return ints.reduce((key, int, i) => key | (int << (i * 10)))
}

function minLoss(start, end) {
  const queue = new MinPriorityQueue(([node]) =>
    Math.min(...node.incurred.values())
  )

  start.incurred.set(hash(dir(null), 0), 0)
  queue.enqueue([start, null, 0])

  while (!queue.isEmpty()) {
    const [current, direction, steps] = queue.dequeue()

    for (const nextDirection of dirs) {
      const { x, y } = current
      const [dx, dy] = deltas[dir(nextDirection)]
      const neighbor = input[y + dy]?.[x + dx]
      const straight = [null, nextDirection].includes(direction)

      if (!neighbor) continue

      const nextSteps = 1 + (straight ? steps : 0)

      if (nextDirection === opposite(direction)) continue
      if (straight && steps >= 10) continue
      if (!straight && steps < 4) continue
      if (neighbor === start) continue
      if (neighbor === end && nextSteps < 4) continue

      const ik = hash(dir(direction), steps)
      const nik = hash(dir(nextDirection), nextSteps)
      const incurred = current.incurred.get(ik) ?? Infinity
      const nincurred = neighbor.incurred.get(nik) ?? Infinity

      const totalIncurred = incurred + neighbor.loss

      if (nincurred > totalIncurred) {
        neighbor.incurred.set(nik, totalIncurred)
        queue.enqueue([neighbor, nextDirection, nextSteps])
      }
    }
  }

  return Math.min(...end.incurred.values())
}

const start = input.at(0).at(0)
const end = input.at(-1).at(-1)
const result = minLoss(start, end)

log({ result })
