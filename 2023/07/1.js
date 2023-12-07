/** Data */

const input = require('./input.txt')
  .split('\n')
  .map((line) => line.split(' '))
  .map(([cards, bid]) => ({ cards: cards.split(''), bid: Number(bid) }))

const cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']

const types = [
  () => true,
  (h) => hasNOfKind(2, h),
  (h) => hasNOfKind(2, h, 2),
  (h) => hasNOfKind(3, h),
  (h) => hasNOfKind(3, h) && hasNOfKind(2, h),
  (h) => hasNOfKind(4, h),
  (h) => hasNOfKind(5, h),
]

const typeTests = types.toReversed()

/** Helpers */

function hasNOfKind(n, cards, times = 1) {
  const counts = cards.reduce((acc, card) => {
    acc[card] = (acc[card] ?? 0) + 1
    return acc
  }, {})

  return Object.values(counts).filter((v) => v === n).length === times
}

function getHandPower(hand) {
  return 6 - typeTests.findIndex((test) => test(hand.cards))
}

function getCardPower(card) {
  return cards.findIndex((c) => c === card)
}

/** Result */

const result = input
  .sort((a, b) => {
    const [handA, handB] = [a, b].map(getHandPower)

    if (handA !== handB) {
      return handA - handB
    }

    for (let i = 0; i < 5; i++) {
      const [cardA, cardB] = [a, b].map((x) => x.cards[i]).map(getCardPower)

      if (cardA !== cardB) {
        return cardA - cardB
      }
    }
  })
  .reduce((sum, hand, i) => sum + (i + 1) * hand.bid, 0)

log({ result })
