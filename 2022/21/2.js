const EventEmitter = require('eventemitter3')
const emitter = new EventEmitter()

const compute = (a, op, b) => {
  if (op === '+') return a + b
  if (op === '-') return a - b
  if (op === '*') return a * b
  if (op === '/') return a / b
  if (op === '=') return a === b
}

let min = 0
let max = Number.MAX_SAFE_INTEGER
let humn = 1

emitter.on('root', (isDone, a, b) => {
  if (isDone) {
    return console.log({ result: humn })
  }

  // swap min & max below if input has slope of a(humn) > 0
  if (a > b) min = humn
  if (a < b) max = humn

  humn = Math.ceil((max + min) / 2)

  // prevent stack overflow
  setImmediate(() => emitter.emit('humn', humn))
})

require('./input.txt')
  .split('\n')
  .map((row) => row.split(': '))
  .forEach(([id, output]) => {
    if (id === 'humn') {
      return
    }

    if (!Number.isNaN(Number(output))) {
      return emitter.on('humn', () => {
        emitter.emit(id, Number(output))
      })
    }

    if (id === 'root') {
      output = output.replace(/\+|\-|\*|\//, '=')
    }

    const [idA, op, idB] = output.split(' ')
    let a, b

    const yell = () => {
      const value = compute(a, op, b)
      emitter.emit(id, value, a, b)
      a = b = undefined
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

emitter.emit('humn', humn)
