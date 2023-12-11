const input = require('./input.txt')
  .split('\n')
  .map((l, i) => l.split('').map((char, j) => ({ char, i, j })))

function transpose(rows) {
  return rows[0].map((_, i) => rows.map((row) => row[i]))
}

const N = 1e6
const emptyRows = input.map((r) => r.every((x) => x.char === '.'))
const emptyCols = transpose(input).map((c) => c.every((x) => x.char === '.'))
const galaxies = input.flat().filter((x) => x.char === '#')
const pairs = new Map()

for (const g1 of galaxies) {
  const set = new Set()

  for (const g2 of galaxies) {
    if (g1 === g2) continue
    if (pairs.get(g1)?.has(g2)) continue
    if (pairs.get(g2)?.has(g1)) continue
    set.add(g2)
  }

  if (set.size) pairs.set(g1, set)
}

const flatPairs = []

for (const [g1, g2set] of pairs.entries()) {
  for (const g2 of g2set.values()) {
    flatPairs.push([g1, g2])
  }
}

const result = flatPairs
  .map(([g1, g2]) => {
    const jmax = Math.max(g1.j, g2.j)
    const imax = Math.max(g1.i, g2.i)
    const jmin = Math.min(g1.j, g2.j)
    const imin = Math.min(g1.i, g2.i)

    const emptyRowsCrossed = emptyRows.filter(
      (empty, i) => empty && i < imax && i > imin
    ).length

    const emptyColsCrossed = emptyCols.filter(
      (empty, j) => empty && j < jmax && j > jmin
    ).length

    const dist =
      jmax -
      jmin +
      (imax - imin) +
      (N - 1) * (emptyRowsCrossed + emptyColsCrossed)

    return dist
  })
  .reduce((acc, steps) => acc + steps, 0)

log({ result })
