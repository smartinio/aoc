const fse = require('fs-extra')

// Allows node to import the input text files like "require('./input.txt')"
require.extensions['.txt'] = (module, filename) => {
  module.exports = fse.readFileSync(filename, 'utf8').trim()
}

if (fse.existsSync(process.argv[2])) {
  require(process.argv[2])
}
