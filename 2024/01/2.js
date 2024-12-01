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

const count = r.reduce((acc, n) => {
  acc[n] = (acc[n] || 0) + 1
  return acc
}, {})

const result = l.reduce((acc, n) => acc + n * (count[n] || 0), 0)

console.log({ result })
