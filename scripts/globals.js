const fse = require('fs-extra')
const util = require('util')

// Allows node to import the input text files like "require('./input.txt')"
require.extensions['.txt'] = (module, filename) => {
  module.exports = fse.readFileSync(filename, 'utf8').trim()
}

global.log = (...args) => {
  console.log(
    ...args.map((arg) => util.inspect(arg, { colors: true, depth: Infinity }))
  )
}

if (fse.existsSync(process.argv[2])) {
  require(process.argv[2])
}
