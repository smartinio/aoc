const result = require('./input.txt')
  .split('\n')
  .map((line) => {
    const [first] = line.match(/\d/)
    const [last] = line.match(/(\d)(?!.*\d)/)

    return first + last
  })
  .reduce((acc, n) => acc + Number(n), 0)

log({ result })
