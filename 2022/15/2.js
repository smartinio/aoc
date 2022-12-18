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

const scanSensorEdges = () => {
  const MIN = 0
  const MAX = 4e6

  for (const { sensor, distance } of input) {
    const delta = distance + 1
    const minY = Math.max(MIN, sensor.y - delta)
    const maxY = Math.min(MAX, sensor.y + delta)

    for (let y = minY; y <= maxY; y++) {
      const reach = delta - Math.abs(sensor.y - y)
      const xs = [sensor.x - reach, sensor.x + reach]

      for (const x of xs) {
        const sensorTooFarAway = ({ sensor, distance }) => {
          return getDistance(sensor.x, sensor.y, x, y) > distance
        }

        if (x >= MIN && x <= MAX && input.every(sensorTooFarAway)) {
          return { x, y }
        }
      }
    }
  }
}

const beacon = scanSensorEdges()

console.log({ result: beacon.x * 4e6 + beacon.y })
