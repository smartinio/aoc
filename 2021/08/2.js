const input = require('./input.txt')
  .split('\n')
  .filter(Boolean)
  .map((x) => x.split(' | '))
  .map((x) => x.map((z) => z.split(' ')))

const contains = (unknown, letters) =>
  letters.split('').every((l) => unknown.split('').includes(l))

let sum = 0

for (const entry of input) {
  const [patterns, _output] = entry
  const output = _output.map((v) => v.split('').sort().join(''))
  const unknown = { 0: [], 2: [], 3: [], 5: [], 6: [], 9: [] }
  const known = []

  for (let pattern of patterns) {
    pattern = pattern.split('').sort().join('')
    if (pattern.length === 2) {
      known[1] = pattern
    } else if (pattern.length === 3) {
      known[7] = pattern
    } else if (pattern.length === 4) {
      known[4] = pattern
    } else if (pattern.length === 7) {
      known[8] = pattern
    } else if (pattern.length === 5) {
      unknown[2].push(pattern)
      unknown[3].push(pattern)
      unknown[5].push(pattern)
    } else {
      unknown[0].push(pattern)
      unknown[6].push(pattern)
      unknown[9].push(pattern)
    }
  }

  // find 6
  const index6 = unknown[6].findIndex((v) => !contains(v, known[1]))
  known[6] = unknown[6][index6]
  delete unknown[6]
  unknown[0].splice(index6, 1)
  unknown[9].splice(index6, 1)

  // find 3
  const index3 = unknown[3].findIndex((v) => contains(v, known[7]))
  known[3] = unknown[3][index3]
  delete unknown[3]
  unknown[2].splice(index3, 1)
  unknown[5].splice(index3, 1)

  // find 9
  const index9 = unknown[9].findIndex((v) => contains(v, known[3]))
  known[9] = unknown[9][index9]
  delete unknown[9]
  unknown[0].splice(index9, 1)

  // find 5
  const index5 = unknown[5].findIndex((v) => contains(known[9], v))
  known[5] = unknown[5][index5]
  delete unknown[5]
  unknown[2].splice(index5, 1)

  // find 0
  known[0] = unknown[0][0]
  delete unknown[0]

  // find 2
  known[2] = unknown[2][0]
  delete unknown[2]

  sum += parseInt(
    output
      .map((val) => known.indexOf(val))
      .reduce((acc, digit) => acc + digit, '')
  )
}

console.log({ sum })
