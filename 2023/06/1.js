const input = require('./input.txt').split('\n')
const times = input.at(0).split(':').at(1).match(/\d+/g).map(Number)
const dists = input.at(1).split(':').at(1).match(/\d+/g).map(Number)
const races = times.map((time, i) => ({ time, dist: dists[i] }))

let result = 1

for (const { time, dist } of races) {
  let ways = 0

  for (let hold = 1; hold < time; hold++) {
    if (hold * (time - hold) > dist) {
      ways += 1
    }
  }

  result *= ways
}

log({ result })
