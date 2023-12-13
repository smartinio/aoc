const input = require('./input.txt')
  .split('\n\n')
  .map((p) => p.split('\n').map((r) => r.split('')))

function transpose(rows) {
  return rows[0].map((_, i) => rows.map((row) => row[i]))
}

function hasErrors(a, b) {
  return a.some((c, i) => c !== b[i])
}

function isReflection(pattern, i) {
  let di = 0

  while (true) {
    di++
    const a = pattern[i - di]
    const b = pattern[i + 1 + di]

    if (!(a && b)) break
    if (hasErrors(a, b)) return false
  }

  return true
}

function findMirrorLine(pattern) {
  for (let i = 0; i < pattern.length; i++) {
    const a = pattern[i]
    const b = pattern[i + 1]

    if (!b) return
    if (!hasErrors(a, b) && isReflection(pattern, i)) return i + 1
  }
}

const result = input
  .map((pattern) => {
    const horizontal = findMirrorLine(pattern)

    if (horizontal) return 100 * horizontal

    return findMirrorLine(transpose(pattern))
  })
  .reduce((sum, n) => sum + n, 0)

log({ result })
