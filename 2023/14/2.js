const input = require('./input.txt')
  .split('\n')
  .map((row) => row.split(''))

function rotate(rows) {
  return rows[0].map((_, i) => rows.map((row) => row[i]).reverse())
}

function tilt(column) {
  return column
    .join('')
    .match(/(#+[^#]*)|([^#]+)/g)
    .map((s) => s.split(''))
    .flatMap((s) => s.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)))
}

const shapeSeen = new Map()
const seenShape = new Map()

let tilts = 0
let platform = input

while (true) {
  platform = rotate(platform).map(tilt)
  tilts++

  const shape = JSON.stringify(platform)

  if (shapeSeen.has(shape)) {
    const seenAtTilts = shapeSeen.get(shape)
    const interval = tilts - seenAtTilts
    const offset = interval - ((4e9 - tilts) % interval)
    const finalSeenAt = tilts - offset

    platform = JSON.parse(seenShape.get(finalSeenAt))
    break
  }

  shapeSeen.set(shape, tilts)
  seenShape.set(tilts, shape)
}

const result = platform
  .map((row, i, a) => (a.length - i) * row.filter((x) => x === 'O').length)
  .reduce((sum, load) => sum + load, 0)

log({ result })
