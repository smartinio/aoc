const [year, name, part] = process.argv.slice(2)
const fs = require('fs')

const file = require('path').join(
  __dirname,
  '..',
  year,
  name,
  part.replace('.js', '') + '.js'
)

// Don't judge me
require.extensions['.txt'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8')
}

require(file)
