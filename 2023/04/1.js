const result = require('./input.txt')
  .split('\n')
  .map((line) => line.split('|').map((list) => list.match(/\d+\b(?!:)/g)))
  .map(([winning, owned]) => ({ winning, owned }))
  .map((card) => {
    const winCount = card.owned.filter((c) => card.winning.includes(c)).length

    return winCount ? Math.pow(2, winCount - 1) : 0
  })
  .reduce((acc, n) => acc + n, 0)

log({ result })
