const fse = require('fs-extra')
const path = require('path')
const [year, name] = process.argv.slice(2)

const src = path.join(__dirname, 'template')
const dest = path.join(__dirname, '..', year, name)

if (!fse.pathExistsSync(dest)) {
  fse.copySync(src, dest)
} else {
  console.error('Already exists:', dest)
}
