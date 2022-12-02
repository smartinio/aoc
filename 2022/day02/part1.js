const input = require('./input.txt')

const moves = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
}

const scores = {
  moves: {
    rock: 1,
    paper: 2,
    scissors: 3,
  },
  outcomes: {
    win: 6,
    draw: 3,
    loss: 0,
  },
}

const beats = (a, b) => {
  if (a === 'rock') return b === 'scissors'
  if (a === 'scissors') return b === 'paper'
  if (a === 'paper') return b === 'rock'
}

const getOutcomeScore = (theirMove, myMove) => {
  if (theirMove === myMove) return scores.outcomes.draw
  if (beats(theirMove, myMove)) return scores.outcomes.loss
  return scores.outcomes.win
}

const result = input
  .trim()
  .split('\n')
  .map((round) => round.split(' ').map((x) => moves[x]))
  .reduce((total, move) => {
    const [theirMove, myMove] = move
    const moveScore = scores.moves[myMove]
    const outcomeScore = getOutcomeScore(theirMove, myMove)

    return total + moveScore + outcomeScore
  }, 0)

console.log({ result })
