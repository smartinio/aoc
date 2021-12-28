const input = require('./input.txt').split('')

console.log(input)

const versions = []
let pointer

while (true) {
  // find packet version (first 3 bits)
  // find packet type ID (3 following bits) (4 = literal value,
  // find length type ID (1 following bits) (0 = length 15, 1 = length 11)
}
