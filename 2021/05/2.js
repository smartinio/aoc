const input = require('./input.txt').split('\n').filter(Boolean)

const canvas = {
  data: [],
}

const isNonDiagonal = ([a, b]) => {
  return a.x === b.x || a.y === b.y
}

const toCoordinatePairs = (line) => {
  const [[x1, y1], [x2, y2]] = line
    .split(' -> ')
    .map((p) => p.split(',').map(Number))
  return [
    { x: x1, y: y1 },
    { x: x2, y: y2 },
  ]
}

const segments = input.map(toCoordinatePairs)

const increment = (x, y) => {
  canvas.data[x] = canvas.data[x] || []
  canvas.data[x][y] = canvas.data[x][y] || 0
  canvas.data[x][y] += 1
  // console.log('incrementing', { x, y })
}

segments.forEach(([a, b]) => {
  if (a.x === b.x) {
    const x = a.x
    const [A, B] = [a, b].sort((c, d) => c.y - d.y)
    for (let y = A.y; y <= B.y; y++) {
      increment(x, y)
    }
  } else {
    const [A, B] = [a, b].sort((c, d) => c.x - d.x)
    let y = A.y
    for (let x = A.x; x <= B.x; x++) {
      increment(x, y)
      if (y < B.y) y++
      if (y > B.y) y--
    }
  }
})

let count = 0

for (let i = 0; i < canvas.data.length; i++) {
  if (canvas.data[i]) {
    for (let j = 0; j < canvas.data[i].length; j++) {
      if (canvas.data[i][j] > 1) {
        count++
      }
    }
  }
}

console.log({ count })
