const input = require('./input.txt').split('')
const shapes = require('./shapes.txt')
  .split('\n\n')
  .map((shape) =>
    shape
      .split('\n')
      .map((row) => row.split('').map((point) => (point === '#' ? 1 : 0)))
  )

const rested = new Set()

function getRock(i, yMax) {
  const currentHeight = yMax + 1

  return {
    position: { x: 2, y: currentHeight + 3 },
    shape: shapes[i % shapes.length],
  }
}

function getPositions(rock) {
  const { shape, position } = rock

  const solids = shape.map((row, y) =>
    row.map((col, x) =>
      col
        ? {
            y: position.y + (shape.length - 1) - y,
            x: position.x + x,
          }
        : null
    )
  )

  return solids.flat().filter(Boolean)
}

function key(x, y) {
  return [x, y].join(':')
}

function fall(rock) {
  if (rock.position.y === 0) return false

  const positions = getPositions(rock)

  for (const { x, y } of positions) {
    if (rested.has(key(x, y - 1))) return false
  }

  rock.position.y--

  return true
}

function push(rock, direction) {
  const positions = getPositions(rock)
  const dx = direction === '>' ? 1 : -1

  for (const { x, y } of positions) {
    const newX = x + dx
    if ([-1, 7].includes(newX)) return
    if (rested.has(key(newX, y))) return
  }

  rock.position.x += dx
}

let inputIndex = -1
function jet() {
  inputIndex = (inputIndex + 1) % input.length
  return input[inputIndex]
}

let count = 0
let yMax = -1

while (count < 2022) {
  const rock = getRock(count, yMax)

  while (true) {
    const direction = jet()
    push(rock, direction)

    const couldFall = fall(rock)
    if (!couldFall) break
  }

  const positions = getPositions(rock)

  for (const { x, y } of positions) {
    rested.add(key(x, y))
    yMax = Math.max(yMax, y)
  }

  count++
}

console.log({ result: yMax + 1 })
