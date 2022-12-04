const input = require('./input.txt').trim().split('\n')

function findRow(predicate) {
  let remaining = input

  for (let bitpos = 0; bitpos < input[0].length; bitpos++) {
    if (remaining.length === 1) {
      break
    }

    const partitions = [[], []]

    for (let binary of remaining) {
      const value = Number(binary[bitpos])
      partitions[value].push(binary)
    }

    const windex = predicate(partitions)
    remaining = partitions[windex]
  }

  return remaining[0]
}

const oxy = findRow(([zero, one]) => {
  return one.length < zero.length ? 0 : 1
})

const co2 = findRow(([zero, one]) => {
  return zero.length > one.length ? 1 : 0
})

const oxydec = parseInt(oxy, 2)
const co2dec = parseInt(co2, 2)

console.log({
  oxy,
  co2,
  oxydec,
  co2dec,
  answer: oxydec * co2dec,
})
