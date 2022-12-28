const MAX_SIZE = 100000
const lines = require('./input.txt').split('\n')

let result = 0

let finalDir = lines.reduce((current, line) => {
  if (line === '$ cd ..') {
    if (current.size <= MAX_SIZE) result += current.size
    current.parent.size += current.size
    return current.parent
  }

  if (line.startsWith('$ cd')) {
    return { parent: current, size: 0 }
  }

  if (/^\d+/.test(line)) {
    const [size] = line.split(' ')
    current.size += Number(size)
    return current
  }

  return current
}, null)

while (finalDir.parent) {
  if (finalDir.size <= MAX_SIZE) result += finalDir.size
  finalDir.parent.size += finalDir.size
  finalDir = finalDir.parent
}

console.log({ result })
