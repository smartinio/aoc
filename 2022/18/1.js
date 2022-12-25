const cubes = require('./input.txt')
  .split('\n')
  .reduce((set, xyz) => set.add(xyz), new Set())

let faces = cubes.size * 6

for (const xyz of cubes) {
  const [x, y, z] = xyz.split(',').map(Number)

  const neighbors = [
    [x, y + 1, z].join(','),
    [x, y - 1, z].join(','),
    [x + 1, y, z].join(','),
    [x - 1, y, z].join(','),
    [x, y, z + 1].join(','),
    [x, y, z - 1].join(','),
  ]

  for (const neighbor of neighbors) {
    if (cubes.has(neighbor)) {
      faces--
    }
  }
}

console.log({ result: faces })
