const input = require('./input.txt')
  .replace('target area: ', '')
  .split(', ')
  .map((entry) => entry.split('='))
  .map(([coord, range]) => [coord, range.split('..').map(Number)])
  .reduce((acc, [coord, range]) => {
    acc[coord] = range
    return acc
  }, {})

console.log(input)

let position = { x: 0, y: 0 }
let velocity = { x: 0, y: 0 }

function isWithinArea() {
  return (
    position.x >= input.x[0] &&
    position.x <= input.x[1] &&
    position.y >= input.y[0] &&
    position.y <= input.y[1]
  )
}

function step() {
  position.x += velocity.x
  position.y += velocity.y
  if (velocity.x > 0) velocity.x -= 1
  if (velocity.x < 0) velocity.x += 1
  velocity.y -= 1
}

const highest = {
  initialVelocity: { x: 0, y: 0 },
}

let distinct = 0

for (let x = -input.x[1]; x <= input.x[1]; x++) {
  for (let y = -500; y < 500; y++) {
    let highestY = 0
    velocity.x = x
    velocity.y = y
    position.x = position.y = 0

    while (true) {
      step()

      if (highestY < position.y) {
        highestY = position.y
      }

      if (isWithinArea()) {
        distinct++
        if (highest.initialVelocity.y < y) {
          highest.initialVelocity.x = x
          highest.initialVelocity.y = y
          highest.y = highestY
        }
        break
      }

      if (position.y < input.y[0] || position.x > input.x[1]) {
        break
      }
    }
  }
}

console.log({ highest, distinct })
