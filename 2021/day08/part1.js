const input = require('./input.txt')
  .split('\n')
  .filter(Boolean)
  .map((x) => x.split(' | '))
  .map((x) => x.map((z) => z.split(' ')))

let counter = 0

for (const entry of input) {
  const [patterns, output] = entry
  const knowns = []

  for (const pattern of patterns) {
    if ([2, 3, 4, 7].includes(pattern.length)) {
      knowns.push(pattern.split('').sort().join(''))
    }
  }

  for (const sequence of output.map((x) => x.split('').sort().join(''))) {
    if (knowns.includes(sequence)) {
      counter++
    }
  }
}

console.log({ counter })
