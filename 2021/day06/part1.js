let input = require('./input.txt')
  .split(',')
  .map(Number)
  .map((timer) => ({ timer }))

const RESET = 6
const NEWBORN = RESET + 2

const tick = () => {
  const newborn = []

  for (const fish of input) {
    if (fish.timer === 0) {
      fish.timer = RESET
      newborn.push({ timer: NEWBORN })
    } else {
      fish.timer--
    }
  }

  for (const newb of newborn) {
    input.push(newb)
  }
}

for (let i = 0; i < 80; i++) {
  tick()
  console.log('gen', i + 1, '=>', input.length)
}
