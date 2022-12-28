const CAPACITY = 70000000
const NEEDED_SPACE = 30000000

const lines = require('./input.txt').split('\n')
const dirs = []

let finalDir = lines.reduce((current, line) => {
  if (line === '$ cd ..') {
    dirs.push(current)
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
  finalDir.parent.size += finalDir.size
  finalDir = finalDir.parent
}

const availableSpace = CAPACITY - finalDir.size
const minSpaceToReclaim = NEEDED_SPACE - availableSpace
const result = dirs
  .sort((a, b) => a.size - b.size)
  .find((dir) => dir.size >= minSpaceToReclaim).size

console.log({ result })
