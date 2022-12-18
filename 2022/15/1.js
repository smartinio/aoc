const getDistance = (ax, ay, bx, by) => {
  return Math.abs(ax - bx) + Math.abs(ay - by)
}

const input = require('./input.txt')
  .split('\n')
  .map((line) => line.match(/(-*\d+)/g).map(Number))
  .map(([sensorX, sensorY, beaconX, beaconY]) => ({
    sensor: { x: sensorX, y: sensorY },
    beacon: { x: beaconX, y: beaconY },
    distance: getDistance(sensorX, sensorY, beaconX, beaconY),
  }))

const Y_LINE = 2000000

const beaconsAtYLine = input
  .map((pair) => pair.beacon)
  .filter((beacon) => beacon.y === Y_LINE)
  .reduce((set, beacon) => set.add(beacon.x), new Set())

const positions = new Set()

for (const { sensor, distance } of input) {
  const reach = distance - Math.abs(Y_LINE - sensor.y)
  const minX = sensor.x - reach
  const maxX = sensor.x + reach

  for (let x = minX; x <= maxX; x++) {
    if (!beaconsAtYLine.has(x)) positions.add(x)
  }
}

console.log({ result: positions.size })
