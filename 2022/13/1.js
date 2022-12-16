const input = require('./input.txt')
  .split('\n\n')
  .map((line) => line.split('\n').map((item) => JSON.parse(item)))
  .map((pair, i) => ({ index: i + 1, pair }))

const { isArray } = Array

const compare = ([L, ...restL], [R, ...restR]) => {
  switch (true) {
    case L === undefined && R === undefined:
      return undefined

    case L !== undefined && R === undefined:
      return false

    case L === undefined && R !== undefined:
      return true

    case isArray(L) && isArray(R):
      return compare(L, R) ?? compare(restL, restR)

    case isArray(L):
      return compare(L, [R]) ?? compare(restL, restR)

    case isArray(R):
      return compare([L], R) ?? compare(restL, restR)

    case L === R:
      return compare(restL, restR)

    default:
      return L < R
  }
}

const result = input
  .filter(({ pair: [L, R] }) => compare(L, R))
  .reduce((acc, item) => acc + item.index, 0)

console.log({ result })
