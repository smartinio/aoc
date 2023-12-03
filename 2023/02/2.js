const colors = ['red', 'green', 'blue']
const regex = new RegExp(`\\d+ (${colors.join('|')})`, 'g')

const result = require('./input.txt')
  .split('\n')
  .map((line) => line.split(';'))
  .map((sets, i) => ({
    id: i + 1,
    sets: sets.map((s) =>
      s.match(regex).reduce((acc, sample) => {
        const [count, color] = sample.split(' ')
        acc[color] = Number(count)
        return acc
      }, Object.fromEntries(colors.map((c) => [c, 0])))
    ),
  }))
  .map((game) =>
    colors.reduce(
      (power, color) => power * Math.max(...game.sets.map((set) => set[color])),
      1
    )
  )
  .reduce((acc, power) => acc + power, 0)

log({ result })
