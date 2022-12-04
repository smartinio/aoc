const fse = require('fs-extra')
const path = require('path')
const args = require('args')

args
  .option('year', 'AoC year', new Date().getFullYear(), String)
  .option('day', 'Day of month', new Date().getDate(), (x) => `0${x}`.slice(-2))

const { year, day } = args.parse(process.argv)
const src = path.join(__dirname, 'template')
const dest = path.join(__dirname, '..', year, day)

if (!fse.pathExistsSync(dest)) {
  fse.copySync(src, dest)
} else {
  console.error('Already exists:', dest)
}
