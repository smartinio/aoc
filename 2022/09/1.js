const { abs } = Math

const input = require('./input.txt')
  .split('\n')
  .map((x) => x.split(' '))
  .map(([direction, steps]) => ({ direction, steps: Number(steps) }))

const visited = new Set()
const head = { x: 0, y: 0 }
const tail = { x: 0, y: 0 }

const move = (direction) => {
  switch (direction) {
    case 'R':
      head.x++
      if (abs(head.x - tail.x) > 1) {
        tail.x = head.x - 1
        tail.y = head.y
      }
      break
    case 'L':
      head.x--
      if (abs(head.x - tail.x) > 1) {
        tail.x = head.x + 1
        tail.y = head.y
      }
      break
    case 'U':
      head.y++
      if (abs(head.y - tail.y) > 1) {
        tail.y = head.y - 1
        tail.x = head.x
      }
      break
    case 'D':
      head.y--
      if (abs(head.y - tail.y) > 1) {
        tail.y = head.y + 1
        tail.x = head.x
      }
      break
  }

  visited.add(tail.x + ':' + tail.y)
}

for (const { direction, steps } of input) {
  for (let i = 0; i < steps; i++) {
    move(direction)
  }
}

console.log({ result: visited.size })
