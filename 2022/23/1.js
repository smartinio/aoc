const elves = require('./input.txt')
  .split('\n')
  .flatMap((row, y) =>
    row
      .split('')
      .map((c, x) => (c === '#' ? { id: `start:${x}:${y}`, x, y } : null))
  )
  .filter(Boolean)

const N = { x: 0, y: -1 }
const NE = { x: 1, y: -1 }
const E = { x: 1, y: 0 }
const SE = { x: 1, y: 1 }
const S = { x: 0, y: 1 }
const SW = { x: -1, y: 1 }
const W = { x: -1, y: 0 }
const NW = { x: -1, y: -1 }

const dirChecks = [
  [N, NE, NW],
  [S, SE, SW],
  [W, NW, SW],
  [E, NE, SE],
]

function hash(...ints) {
  return ints.reduce((key, int, i) => key | ((int + 1000) << (i * 11)), 0)
}

function isAlone(elf, positions) {
  for (const d of [N, NE, E, SE, S, SW, W, NW]) {
    const x = elf.x + d.x
    const y = elf.y + d.y
    if (positions.has(hash(x, y))) return false
  }
  return true
}

for (_ of range(10)) {
  const proposals = new Map()

  const elfpositions = elves.reduce(
    (set, { x, y }) => set.add(hash(x, y)),
    new Set()
  )

  elfloop: for (const elf of elves) {
    if (isAlone(elf, elfpositions)) continue

    checkloop: for (const dirs of dirChecks) {
      for (const d of dirs) {
        const x = elf.x + d.x
        const y = elf.y + d.y

        if (elfpositions.has(hash(x, y))) continue checkloop
      }

      const [d] = dirs
      const x = elf.x + d.x
      const y = elf.y + d.y
      const key = hash(x, y)
      const proposal = proposals.get(key) || { x, y, elves: [] }

      proposal.elves.push(elf)
      proposals.set(key, proposal)

      continue elfloop
    }
  }

  for (const proposal of proposals.values()) {
    if (proposal.elves.length !== 1) continue
    const [elf] = proposal.elves
    elf.x = proposal.x
    elf.y = proposal.y
  }

  dirChecks.push(dirChecks.shift())
}

const xMax = Math.max(...elves.map((e) => e.x))
const xMin = Math.min(...elves.map((e) => e.x))
const yMax = Math.max(...elves.map((e) => e.y))
const yMin = Math.min(...elves.map((e) => e.y))

const width = 1 + xMax - xMin
const height = 1 + yMax - yMin
const area = width * height

console.log({ result: area - elves.length })
