const DECRYPTION_KEY = 811589153

const nodes = require('./input.txt')
  .split('\n')
  .map((x) => ({ value: Number(x) * DECRYPTION_KEY }))

// build doubly linked list
nodes.forEach((node, i) => {
  node.next = nodes[(i + 1) % nodes.length]
  node.next.prev = node
})

const mix = () => {
  for (const node of nodes) {
    const left = node.value < 0
    const steps = Math.abs(node.value) % (nodes.length - 1)

    if (steps === 0) {
      continue
    }

    let current = node

    for (let _ of range(steps)) {
      current = left ? current.prev : current.next
    }

    const neighbor = left ? current.prev : current

    // connect old neighbors to each other
    node.prev.next = node.next
    node.next.prev = node.prev

    // connect node to new neighbors
    node.next = neighbor.next
    node.prev = neighbor

    // connect new neighbors to node
    neighbor.next.prev = node
    neighbor.next = node
  }
}

for (let _ of range(10)) {
  mix()
}

let result = 0
let start = nodes.find((node) => node.value === 0)

for (const grove of [1000, 2000, 3000]) {
  let current = start

  for (let step = 0; step < grove % nodes.length; step++) {
    current = current.next
  }

  result += current.value
}

console.log({ result })
