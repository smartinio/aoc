const input = require('./input.txt')
  .split('\n')
  .map((line) => line.split(' '))
  .map(([L, R]) => ({ conditions: L, counts: R.split(',').map(Number) }))

function count(conditions, counts) {
  if (!conditions.includes('?')) {
    const final = conditions.split(/\.+/).filter(Boolean)

    if (
      final.length === counts.length &&
      final.every((c, i) => c.length === counts[i])
    ) {
      return 1
    }

    return 0
  }

  const operational = count(conditions.replace('?', '.'), counts)
  const damaged = count(conditions.replace('?', '#'), counts)

  return operational + damaged
}

const result = input
  .map(({ conditions, counts }) => count(conditions, counts))
  .reduce((acc, n) => acc + n, 0)

log({ result })
