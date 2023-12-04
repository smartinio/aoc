const input = require('./input.txt')
  .split('\n')
  .map((line) => line.split('|').map((list) => list.match(/\d+\b(?!:)/g)))
  .map(([winning, owned], index) => ({ index, winning, owned }))

const unprocessed = [...input.values()]

let totalCards = unprocessed.length

while (unprocessed.length > 0) {
  const card = unprocessed.pop()
  card.winCount ??= card.owned.filter((c) => card.winning.includes(c)).length
  const maxIndex = Math.min(card.index + card.winCount, input.length - 1)

  for (let wonCard = card.index + 1; wonCard <= maxIndex; wonCard++) {
    unprocessed.push(input[wonCard])
    totalCards += 1
  }
}

log({ result: totalCards })
