const result = require('./input.txt')
  .split('\n')
  .map((line) => line.split(';'))
  .map((sets, i) => ({
    id: i + 1,
    sets: sets.map((s) =>
      s.match(/\d+ (red|green|blue)/g).reduce(
        (acc, sample) => {
          const [count, color] = sample.split(' ')
          acc[color] = Number(count)
          return acc
        },
        { red: 0, green: 0, blue: 0 }
      )
    ),
  }))
  .map((game) => {
    const red = Math.max(...game.sets.map((s) => s.red))
    const green = Math.max(...game.sets.map((s) => s.green))
    const blue = Math.max(...game.sets.map((s) => s.blue))

    return red * green * blue
  })
  .reduce((acc, power) => acc + power, 0)

log({ result })
