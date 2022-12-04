const fs = require('fs')

// Allows node to import the input text files like "require('./input.txt')"
require.extensions['.txt'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8')
}

require(process.argv[2])
