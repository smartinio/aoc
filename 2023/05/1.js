const input = require('./input.txt')
  .split('\n\n')
  .map((block) => block.split(':')[1].split('\n').filter(Boolean))

const seeds = input.slice(0, 1).flatMap(([v]) => v.match(/\d+/g).map(Number))

const mappers = input
  .slice(1)
  .map((values) =>
    values
      .map((v) => v.match(/\d+/g).map(Number))
      .map(([dest, src, range]) => ({ dest, src, range }))
  )

const locations = seeds.map((seed) => {
  let value = seed

  for (let mapper of mappers) {
    let map = mapper.find((m) => m.src <= value && m.src + m.range > value)

    if (map) {
      value += map.dest - map.src
    }
  }

  return value
})

const result = Math.min(...locations)

log({ result })
