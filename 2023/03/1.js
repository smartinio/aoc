const input = require('./input.txt')
  .split('\n')
  .map((r) => r.split(''))

const offsetsByDirection = {
  left: -1,
  right: 1,
  vertical: 0,
}

function isSymbolAdjacent(direction, row, col) {
  const offset = offsetsByDirection[direction]
  const index = col + offset
  const chars = [
    input[row - 1]?.[index],
    input[row][index],
    input[row + 1]?.[index],
  ]

  return chars.filter(Boolean).some((x) => /[^\d|\.]/.test(x))
}

function isPartNumber(numLength, row, col) {
  if (isSymbolAdjacent('left', row, col)) return true

  for (let j = col; j < col + numLength; j++) {
    if (isSymbolAdjacent('vertical', row, j)) return true
  }

  return isSymbolAdjacent('right', row, col + numLength - 1)
}

let sum = 0

for (let row = 0; row < input.length; row++) {
  const chars = input[row]
  let col = 0

  while (col < chars.length) {
    const char = chars[col]

    if (isNaN(char)) {
      col++
      continue
    }

    const slice = chars.slice(col)
    let numLength = slice.findIndex((x) => /[^\d]/.test(x))

    if (numLength === -1) {
      numLength = slice.length
    }

    if (isPartNumber(numLength, row, col)) {
      const number = Number(slice.slice(0, numLength).join(''))
      sum += number
    }

    col += numLength
  }
}

log({ result: sum })
