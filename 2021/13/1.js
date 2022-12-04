const input = require('./input.txt').split('\n')

const folds = input
  .filter((v) => v.startsWith('fold'))
  .map((v) => v.split('='))
  .map(([foldAlongAxis, value]) => [foldAlongAxis.split(' ')[2], Number(value)])

const inputs = input
  .filter((v) => !v.startsWith('fold'))
  .map((v) => v.split(',').map(Number))
  .map(([x, y]) => ({ x, y }))

const width = inputs.reduce((acc, input) => {
  if (input.x > acc) acc = input.x
  return acc
}, 0)

const height = inputs.reduce((acc, input) => {
  if (input.y > acc) acc = input.y
  return acc
}, 0)

const paper = Array.from({ length: height + 1 }, () =>
  Array.from({ length: width + 1 }, () => '.')
)

inputs.forEach((input) => {
  paper[input.y] = paper[input.y] || []
  paper[input.y][input.x] = '#'
})

function copyFromRightToLeft(rows, value) {
  rows.forEach((row) => {
    for (let i = 1; i <= row.length - value; i++) {
      if (value + i >= row.length) {
        break
      }
      if (value - i < 0) {
        break
      }
      const val = row[value + i]
      if (val === '#') {
        row[value - i] = val
      }
    }
  })
}

function copyFromBottomToTop(rows, value) {
  for (let i = 1; i <= rows.length - value; i++) {
    for (let j = 0; j < rows[0].length; j++) {
      if (value + i >= rows.length) {
        break
      }
      if (value - i < 0) {
        break
      }
      const val = rows[value + i][j]
      if (val === '#') {
        rows[value - i][j] = val
      }
    }
  }
}

function fold(direction, value) {
  const rows = JSON.parse(JSON.stringify(paper))
  if (direction === 'x') {
    copyFromRightToLeft(rows, value)
    return rows.map((row) => row.slice(0, value))
  } else {
    copyFromBottomToTop(rows, value)
    return rows.slice(0, value)
  }
}

const [[direction, value]] = folds
const firstFold = fold(direction, value)
const visible = firstFold.reduce((acc, val) => {
  return acc + val.filter((v) => v === '#').length
}, 0)

console.log({ visible })
