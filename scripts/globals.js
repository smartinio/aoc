const fse = require('fs-extra')
const util = require('util')

// Allows node to import the input text files like "require('./input.txt')"
require.extensions['.txt'] = (module, filename) => {
  module.exports = fse.readFileSync(filename, 'utf8').trimEnd()
}

global.log = (...args) => {
  console.log(
    ...args.map((arg) =>
      typeof arg === 'string'
        ? arg
        : util.inspect(arg, { colors: true, depth: Infinity })
    )
  )
}

global.range = function* range(start, stop, step = 1) {
  if (stop === undefined) {
    stop = start
    start = 0
  }

  for (let i = start; i < stop; i += step) {
    yield i
  }
}

global.Array.prototype.peek = function () {
  for (let item of this) {
    log(item)
  }
  return this
}

global.clearConsole = () => {
  process.stdout.write('\u001b[3J\u001b[2J\u001b[1J')
  console.clear()
}

if (fse.existsSync(process.argv[2])) {
  require(process.argv[2])
}
