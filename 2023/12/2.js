const { memo } = require('../../utils')

const input = require('./input.txt')
  .split('\n')
  .map((line) => line.split(' '))
  .map(([L, R]) => ({
    conditions: Array.from({ length: 5 }, () => L).join('?'),
    counts: Array.from({ length: 5 }).flatMap(() => R.split(',').map(Number)),
  }))

const count = memo(
  (springs, counts) => springs + counts.join(','),
  (springs, counts) => {
    if (!springs.includes('?')) {
      const final = springs.split(/\.+/).filter(Boolean)

      if (
        final.length === counts.length &&
        final.every((c, i) => c.length === counts[i])
      ) {
        return 1
      }

      return 0
    }

    // Exit if the first potential group is bigger than the first count
    if (springs.indexOf('#') < springs.indexOf('?')) {
      const potential = springs.match(/#+/)

      if (potential?.[0].length > counts[0]) {
        return 0
      }
    }

    const oCount = springs.match(/\?/g)?.length ?? 0
    const dCount = springs.match(/#/g)?.length ?? 0
    const sumCounts = counts.reduce((a, n) => a + n, 0)

    // Exit if there aren't enough question marks left to reach the total count
    if (oCount + dCount < sumCounts) {
      return 0
    }

    if (springs.match(/#(\.|$)/)?.index < springs.indexOf('?')) {
      const first = springs.match(/(#+)\./)

      // Exit if the first final group does not match the first count
      if (first?.[1].length !== counts[0]) {
        return 0
      }

      // If everything checks out, work only with the remaining data
      springs = springs.slice(first.index + first[1].length)
      counts = counts.slice(1)
    }

    const operational = count(springs.replace('?', '.'), counts)
    const damaged = count(springs.replace('?', '#'), counts)

    return operational + damaged
  }
)

const result = input
  .map(({ conditions, counts }) => count(conditions, counts))
  .reduce((acc, n) => acc + n, 0)

log({ result })
