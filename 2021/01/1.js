const [head, ...tail] = require('./input.txt').split('\n').map(Number)

let prev = head
let count = 0
for (let item of tail) {
  if (item > prev) {
    count++
  }
  prev = item
}
console.log(count)
