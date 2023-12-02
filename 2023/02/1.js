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
  .filter((game) =>
    game.sets.every((set) => set.red <= 12 && set.green <= 13 && set.blue <= 14)
  )
  .reduce((acc, game) => acc + game.id, 0)

log({ result })
