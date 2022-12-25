const input = require('./input.txt').split('\n')
const cubes = input.reduce((set, xyz) => set.add(xyz), new Set())
const potentialAirPockets = new Set()

let xMax = Math.max(...input.map((xyz) => Number(xyz.split(',')[0])))
let yMax = Math.max(...input.map((xyz) => Number(xyz.split(',')[1])))
let zMax = Math.max(...input.map((xyz) => Number(xyz.split(',')[2])))

let startXYZ

for (let x of range(xMax + 1)) {
  for (let y of range(yMax + 1)) {
    for (let z of range(zMax + 1)) {
      const xyz = [x, y, z].join(',')
      if (cubes.has(xyz)) continue
      potentialAirPockets.add(xyz)
      if (!startXYZ) startXYZ = xyz
    }
  }
}

const getNeighbors = (xyz) => {
  const [x, y, z] = xyz.split(',').map(Number)
  return [
    [x, y + 1, z].join(','),
    [x, y - 1, z].join(','),
    [x + 1, y, z].join(','),
    [x - 1, y, z].join(','),
    [x, y, z + 1].join(','),
    [x, y, z - 1].join(','),
  ]
}

const removeNonAirPockets = (current) => {
  potentialAirPockets.delete(current)
  const neighbors = getNeighbors(current)

  for (const neighbor of neighbors) {
    if (cubes.has(neighbor)) continue
    if (potentialAirPockets.has(neighbor)) removeNonAirPockets(neighbor)
  }
}

removeNonAirPockets(startXYZ)

for (const airpocket of potentialAirPockets) {
  cubes.add(airpocket)
}

let faces = cubes.size * 6

for (const cube of cubes) {
  const neighbors = getNeighbors(cube)

  for (const neighbor of neighbors) {
    if (cubes.has(neighbor)) faces--
  }
}

console.log({ result: faces })
