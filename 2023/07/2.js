/** Data */

const input = require('./input.txt')
  .split('\n')
  .map((line) => line.split(' '))
  .map(([cards, bid]) => ({ cards: cards.split(''), bid: Number(bid) }))

const cards = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']

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

function count(cards) {
  return cards.reduce((acc, card) => {
    acc[card] = (acc[card] ?? 0) + 1
    return acc
  }, {})
}

function hasNOfKind(n, cards, times = 1) {
  return Object.values(count(cards)).filter((v) => v === n).length === times
}

function replaceJokersWith(other, cards) {
  return cards.map((card) => (card === 'J' ? other : card))
}

function getHandPower(hand) {
  return 6 - typeTests.findIndex((test) => test(hand.cards))
}

function getCardPower(card) {
  return cards.findIndex((c) => c === card)
}

function optimizeHand(hand) {
  return { ...hand, cards: optimizeCards(hand.cards) }
}

function optimizeCards(cards) {
  const nonJokers = cards.filter((c) => c !== 'J')
  const jokerCount = 5 - nonJokers.length

  if (jokerCount === 0) {
    return cards
  }

  if (jokerCount === 5) {
    return ['A', 'A', 'A', 'A', 'A']
  }

  if (
    hasNOfKind(4, nonJokers) ||
    hasNOfKind(3, nonJokers) ||
    hasNOfKind(2, nonJokers)
  ) {
    const counts = count(nonJokers)
    const [[common]] = Object.entries(counts).sort(([, va], [, vb]) => vb - va)

    return replaceJokersWith(common, cards)
  }

  const [highest] = nonJokers.sort((a, b) => getCardPower(b) - getCardPower(a))

  return replaceJokersWith(highest, cards)
}

/** Result */

const result = input
  .sort((a, b) => {
    const [handA, handB] = [a, b].map(optimizeHand).map(getHandPower)

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
