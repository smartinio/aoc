const input = require('./input.txt')
  .split('\n\n')
  .map((p) => p.split('\n').map((r) => r.split('')))

function transpose(rows) {
  return rows[0].map((_, i) => rows.map((row) => row[i]))
}

function countErrors(a, b) {
  return a.filter((c, i) => c !== b[i]).length
}

function isReflection(pattern, i, smudged) {
  let di = 0

  while (true) {
    di++
    const a = pattern[i - di]
    const b = pattern[i + 1 + di]

    if (!(a && b)) break

    const errors = countErrors(a, b)

    if (!errors) continue
    if (smudged || errors > 1) return false

    smudged = true
  }

  return smudged
}

function findSmudgedLine(pattern) {
  for (let i = 0; i < pattern.length; i++) {
    const a = pattern[i]
    const b = pattern[i + 1]

    if (!b) return

    const errors = countErrors(a, b)

    if (errors > 1) continue
    if (isReflection(pattern, i, !!errors)) return i + 1
  }
}

const result = input
  .map((pattern) => {
    const horizontal = findSmudgedLine(pattern)

    if (horizontal) return 100 * horizontal

    return findSmudgedLine(transpose(pattern))
  })
  .reduce((sum, n) => sum + n, 0)

log({ result })
