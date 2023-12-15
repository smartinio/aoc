const input = require('./input.txt')
  .split(',')
  .map((step) => {
    let n = 0

    for (let i = 0; i < step.length; i++) {
      const code = step.charCodeAt(i)
      n += code
      n *= 17
      n = n % 256
    }

    return n
  })
  .reduce((sum, n) => sum + n, 0)

console.log({ result: input })
