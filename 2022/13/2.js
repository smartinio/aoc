const dividers = [[[2]], [[6]]]

const input = require('./input.txt')
  .split('\n\n')
  .map((line) => line.split('\n').map((item) => JSON.parse(item)))
  .concat([dividers])
  .flat()

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
  .sort((a, b) => {
    return compare(a, b) ? -1 : 1
  })
  .reduce((product, packet, i) => {
    if (dividers.includes(packet)) return product * (i + 1)
    return product
  }, 1)

console.log({ result })
