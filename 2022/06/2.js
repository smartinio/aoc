const list = require('./input.txt').split('')

const N = 14

function getFirstMarkerPosition() {
  for (let i = 0; i < list.length; i++) {
    const set = new Set(list.slice(i, i + N))
    if (set.size === N) {
      return i + N
    }
  }
}

const result = getFirstMarkerPosition()

console.log({ result })
