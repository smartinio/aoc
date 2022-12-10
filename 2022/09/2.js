const input = require('./input.txt')
  .split('\n')
  .map((x) => x.split(' '))
  .map(([direction, steps]) => ({ direction, steps: Number(steps) }))

const rope = Array.from(Array(10)).map((_, i) => ({ id: i, x: 0, y: 0 }))

const visited = new Set(['0:0'])

const MOVES = {
  R: { x: 1 },
  L: { x: -1 },
  U: { y: 1 },
  D: { y: -1 },
}

const distance = (a, b) => {
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y))
}

const checkTail = ([head, ...tail]) => {
  const [next] = tail

  if (distance(head, next) > 1) {
    if (head.x > next.x && head.y > next.y) move(tail, MOVES.R, MOVES.U)
    if (head.x > next.x && head.y < next.y) move(tail, MOVES.R, MOVES.D)
    if (head.x < next.x && head.y > next.y) move(tail, MOVES.L, MOVES.U)
    if (head.x < next.x && head.y < next.y) move(tail, MOVES.L, MOVES.D)
  }

  if (head.x > next.x + 1) move(tail, MOVES.R)
  if (head.x < next.x - 1) move(tail, MOVES.L)
  if (head.y > next.y + 1) move(tail, MOVES.U)
  if (head.y < next.y - 1) move(tail, MOVES.D)
}

const move = (knots, ...moves) => {
  const [head, ...tail] = knots

  for (const { x = 0, y = 0 } of moves) {
    head.x += x
    head.y += y
  }

  if (tail.length) {
    return checkTail(knots)
  }

  visited.add(head.x + ':' + head.y)
}

for (const { direction, steps } of input) {
  for (let i = 0; i < steps; i++) {
    move(rope, MOVES[direction])
  }
}

console.log({ visited: visited.size })
