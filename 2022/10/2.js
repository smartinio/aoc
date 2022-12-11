const input = require('./input.txt')
  .split('\n')
  .map((x) => x.split(' '))

const register = {
  X: 1,
}

let cycles = 0
let screen = ''

const cycle = () => {
  const { X } = register
  const litPixels = [X - 1, X, X + 1]
  const lit = litPixels.includes(cycles)

  screen += lit ? '#' : '.'
  cycles = (cycles + 1) % 40
  if (cycles === 0) screen += '\n'
}

for (const [op, arg] of input) {
  if (op === 'noop') {
    cycle()
    continue
  }

  const { X } = register
  cycle()
  cycle()
  register.X = X + Number(arg)
}

console.log(screen)
