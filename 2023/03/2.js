const input = require('./input.txt')
  .split('\n')
  .map((r) => r.split('').map((char) => ({ char, ratio: 1, adjacents: 0 })))

const offsetsByDirection = {
  left: -1,
  right: 1,
  vertical: 0,
}

function findPotentialGear(direction, row, col) {
  const offset = offsetsByDirection[direction]
  const index = col + offset

  for (let i = row - 1; i <= row + 1; i++) {
    const node = input[i]?.[index] || {}
    if (node.char === '*' && node.adjacents < 2) return node
  }
}

function getAdjacentGear(numLength, row, col) {
  let gear

  if ((gear = findPotentialGear('left', row, col))) {
    return gear
  }

  for (let j = col; j < col + numLength; j++) {
    if ((gear = findPotentialGear('vertical', row, j))) {
      return gear
    }
  }

  return findPotentialGear('right', row, col + numLength - 1)
}

for (let row = 0; row < input.length; row++) {
  const chars = input[row]
  let col = 0

  while (col < chars.length) {
    const { char } = chars[col]

    if (isNaN(char)) {
      col++
      continue
    }

    const slice = chars.slice(col).map((x) => x.char)
    let numLength = slice.findIndex((x) => /[^\d]/.test(x))

    if (numLength === -1) {
      numLength = slice.length
    }

    const gear = getAdjacentGear(numLength, row, col)

    if (gear) {
      gear.adjacents += 1
      gear.ratio *= Number(slice.slice(0, numLength).join(''))
    }

    col += numLength
  }
}

const result = input
  .flat()
  .filter((g) => g.char === '*' && g.adjacents === 2)
  .reduce((acc, gear) => acc + gear.ratio, 0)

log({ result })
