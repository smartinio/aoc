const { MinPriorityQueue } = require('@datastructures-js/priority-queue')

let startNodes = []
let endNode

// Build graph
require('./input.txt')
  .split('\n')
  .map((line) =>
    line.split('').map((char) => {
      const node = {
        elevation: char.charCodeAt(0),
        visited: false,
        steps: Infinity,
      }

      if (char === 'S' || char === 'a') {
        node.elevation = 'a'.charCodeAt(0)
        startNodes.push(node)
      }

      if (char === 'E') {
        node.elevation = 'z'.charCodeAt(0)
        endNode = node
      }

      return node
    })
  )
  .forEach((row, y, nodes) => {
    row.forEach((node, x) => {
      node.neighbors = [
        nodes[y - 1]?.[x],
        nodes[y][x + 1],
        nodes[y + 1]?.[x],
        nodes[y][x - 1],
      ].filter(
        (neighbor) => neighbor && node.elevation <= neighbor.elevation + 1
      )
    })
  })

const queue = new MinPriorityQueue((node) => node.steps)

// Dijkstra that shit backwards
endNode.steps = 0
queue.enqueue(endNode)

while (!queue.isEmpty()) {
  const current = queue.dequeue()

  if (current.visited) {
    continue
  }

  for (const neighbor of current.neighbors) {
    const totalSteps = current.steps + 1

    if (neighbor.steps > totalSteps) {
      neighbor.steps = totalSteps
      queue.enqueue(neighbor)
    }
  }

  current.visited = true
}

const [startNode] = startNodes.sort((a, b) => a.steps - b.steps)

console.log({ result: startNode.steps })
