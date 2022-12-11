const input = require('./input.txt')
  .split('\n')
  .map((x) => x.split(' '))

const register = {
  X: 1,
}

let cycles = 0
let sum = 0

const cycle = () => {
  cycles++
  if ((cycles - 20) % 40 === 0) {
    sum += cycles * register.X
  }
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

console.log({ result: sum })
