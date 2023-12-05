/** Inputs */

const input = require('./input.txt')
  .split('\n\n')
  .map((block) => block.split(':')[1].split('\n').filter(Boolean))

const seeds = input
  .slice(0, 1)
  .flatMap(([pairs]) =>
    pairs.match(/\d+ \d+/g).map((pair) => pair.split(' ').map(Number))
  )
  .map(([seed, range]) => ({ min: seed, max: seed + range - 1 }))

const mappers = input.slice(1).map((values) =>
  values
    .map((v) => v.match(/\d+/g).map(Number))
    .map(([dest, src, range]) => ({
      add: dest - src,
      min: src,
      max: src + range - 1,
    }))
)

/** Helpers */

function contains(range, map) {
  return range.min >= map.min && range.max <= map.max
}

function isContainedBy(range, map) {
  return range.min < map.min && range.max > map.max
}

function intersectsLeft(range, map) {
  return range.min < map.min && range.max >= map.min && range.max <= map.max
}

function intersectsRight(range, map) {
  return range.min >= map.min && range.min <= map.max && range.max > map.max
}

function next(min, max, { add } = { add: 0 }) {
  return { min: min + add, max: max + add }
}

/** DFS */

function minLocation(range, mappers) {
  if (mappers.length === 0) {
    return range.min
  }

  const [maps, ...rest] = mappers

  for (const map of maps) {
    if (contains(range, map)) {
      return minLocation(next(range.min, range.max, map), rest)
    }

    if (intersectsRight(range, map)) {
      const embedded = minLocation(next(range.min, map.max, map), rest)
      const upper = minLocation(next(map.max + 1, range.max), mappers)

      return Math.min(embedded, upper)
    }

    if (intersectsLeft(range, map)) {
      const embedded = minLocation(next(map.min, range.max, map), rest)
      const lower = minLocation(next(range.min, map.min - 1), mappers)

      return Math.min(lower, embedded)
    }

    if (isContainedBy(range, map)) {
      const lower = minLocation(next(range.min, map.min - 1), mappers)
      const embedded = minLocation(next(map.min, map.max, map), rest)
      const upper = minLocation(next(map.max + 1, range.max), mappers)

      return Math.min(lower, embedded, upper)
    }
  }

  return minLocation(range, rest)
}

/** Result */

const locations = seeds.map((seed) => minLocation(seed, mappers))

const result = Math.min(...locations)

log({ result })
