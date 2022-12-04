const input = require('./input.txt')

const moves = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'loss',
  Y: 'draw',
  Z: 'win',
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

const whatBeats = {
  paper: 'scissors',
  rock: 'paper',
  scissors: 'rock',
}

const whatLosesTo = {
  scissors: 'paper',
  paper: 'rock',
  rock: 'scissors',
}

const getMyMove = (theirMove, outcome) => {
  if (outcome === 'draw') return theirMove
  if (outcome === 'win') return whatBeats[theirMove]
  return whatLosesTo[theirMove]
}

const result = input
  .trim()
  .split('\n')
  .map((round) => round.split(' ').map((x) => moves[x]))
  .reduce((total, move) => {
    const [theirMove, outcome] = move
    const myMove = getMyMove(theirMove, outcome)
    const moveScore = scores.moves[myMove]
    const outcomeScore = scores.outcomes[outcome]

    return total + moveScore + outcomeScore
  }, 0)

console.log({ result })
