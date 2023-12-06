const input = require('./input.txt').split('\n')
const time = Number(input.at(0).split(':').at(1).match(/\d+/g).join(''))
const dist = Number(input.at(1).split(':').at(1).match(/\d+/g).join(''))

let result = 0

for (let hold = 1; hold < time; hold++) {
  if (hold * (time - hold) > dist) {
    result += 1
  }
}

log({ result })
