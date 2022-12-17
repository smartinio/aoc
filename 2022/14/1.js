const input = require('./input.txt')
  .split('\n')
  .map((line) =>
    line
      .split(' -> ')
      .map((coord) => coord.split(',').map(Number))
      .map(([x, y]) => ({ x, y }))
  )

const xMax = Math.max(...input.flat().map((coord) => coord.x))
const yMax = Math.max(...input.flat().map((coord) => coord.y))
const canvas = Array.from(Array(yMax + 1), () => Array.from(Array(xMax + 1)))

for (const line of input) {
  line.forEach((segment, i) => {
    let next = line[i + 1]
    if (!next) return

    if (next.x < segment.x || next.y < segment.y) {
      ;[next, segment] = [segment, next]
    }

    for (let y = segment.y; y <= next.y; y++) {
      for (let x = segment.x; x <= next.x; x++) {
        canvas[y][x] = '#'
      }
    }
  })
}

let rested = 0
const pos = { x: 500, y: 0 }

while (true) {
  const { x, y } = pos
  const yBelow = y + 1

  if (y === yMax) {
    break
  }

  if (!canvas[yBelow][x]) {
    pos.y = yBelow
  } else if (!canvas[yBelow][x - 1]) {
    pos.y = yBelow
    pos.x = x - 1
  } else if (!canvas[yBelow][x + 1]) {
    pos.y = yBelow
    pos.x = x + 1
  } else {
    canvas[y][x] = 'o'
    rested++
    pos.y = 0
    pos.x = 500
  }
}

console.log({ result: rested })
