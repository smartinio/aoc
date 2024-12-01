const input = require('./input.txt')

const { l, r } = input
  .split('\n')
  .map((x) => x.split('   ').map(Number))
  .reduce(
    (acc, [l, r]) => {
      acc.l.push(l)
      acc.r.push(r)
      return acc
    },
    { l: [], r: [] }
  )

l.sort()
r.sort()

const result = l.reduce((acc, n, i) => acc + Math.abs(n - r[i]), 0)

console.log({ result })
