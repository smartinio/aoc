const args = require('args')
const nodemon = require('nodemon')

args
  .option('year', 'AoC year', new Date().getFullYear(), String)
  .option('day', 'Day of month', new Date().getDate(), (x) => `0${x}`.slice(-2))
  .option('part', 'Problem part', 1, String)
  .option('watch', 'Reload on file change', false)

const { year, day, part, watch } = args.parse(process.argv)

const file = require('path').join(__dirname, '..', year, day, part + '.js')

const clearConsole = () => {
  process.stdout.write('\u001b[3J\u001b[2J\u001b[1J')
  console.clear()
}

if (watch) {
  nodemon({
    script: file,
    ext: 'js txt',
    spawn: true,
    exec: 'node scripts/globals.js',
  })
    .on('start', () => {
      clearConsole()
      console.log('Watching', year, day, 'part', part)
    })
    .on('quit', process.exit)
} else {
  console.log('Executing', year, day, 'part', part)
  require('./globals.js')
  require(file)
}
