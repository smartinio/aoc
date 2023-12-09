const input = require('./input.txt')
  .split('\n')
  .map((l) => l.split(' ').map(Number))

function extrapolate(ns) {
  if (ns.every((n) => n === 0)) {
    return ns.concat(0)
  }

  const [first, ...rest] = ns
  const deltas = rest.map((n, i, arr) => n - (arr[i - 1] ?? first))
  const next = extrapolate(deltas)
  const below = next.at(0)

  return [first - below].concat(ns)
}

const result = input
  .map((ns) => extrapolate(ns).at(0))
  .reduce((sum, n) => sum + n, 0)

log({ result })
