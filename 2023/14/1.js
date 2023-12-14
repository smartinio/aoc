const input = require('./input.txt')
  .split('\n')
  .map((row) => row.split(''))

function transpose(rows) {
  return rows[0].map((_, i) => rows.map((row) => row[i]))
}

function tilt(column) {
  return column
    .join('')
    .match(/[^#]*(#+|$)/g)
    .map((s) => s.split(''))
    .flatMap((s) => s.sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0)))
}

const tilted = transpose(input).map(tilt)

const result = transpose(tilted)
  .map((row, i, a) => (a.length - i) * row.filter((x) => x === 'O').length)
  .reduce((sum, load) => sum + load, 0)

log({ result })
