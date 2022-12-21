const EventEmitter = require('eventemitter3')
const emitter = new EventEmitter()

const compute = (a, op, b) => {
  if (op === '+') return a + b
  if (op === '-') return a - b
  if (op === '*') return a * b
  if (op === '/') return a / b
}

emitter.on('root', (value) => {
  console.log({ result: value })
})

require('./input.txt')
  .split('\n')
  .map((row) => row.split(': '))
  .forEach(([id, output]) => {
    if (!Number.isNaN(Number(output))) {
      // allow all listeners to be set up before emitting
      return setImmediate(() => emitter.emit(id, Number(output)))
    }

    const [idA, op, idB] = output.split(' ')
    let a, b

    const yell = () => {
      const value = compute(a, op, b)
      emitter.emit(id, value)
    }

    emitter.on(idA, (valueA) => {
      a = valueA
      if (b !== undefined) yell()
    })

    emitter.on(idB, (valueB) => {
      b = valueB
      if (a !== undefined) yell()
    })
  })
