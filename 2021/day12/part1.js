const input = require('./input.txt')
  .split('\n')
  .map((v) => v.split('-'))

const nodes = new Map()

function Node(name) {
  this.name = name
  this.links = new Set()
  this.isSmall = name.toLowerCase() === name
}

// build graph
for (const [a, b] of input) {
  const A = nodes.get(a) || new Node(a)
  const B = nodes.get(b) || new Node(b)
  A.links.add(B)
  B.links.add(A)
  nodes.set(a, A)
  nodes.set(b, B)
}

const paths = []

function findPath(current, target, steps, visitedSmall) {
  if (current.isSmall) {
    if (visitedSmall.has(current)) {
      return false
    } else {
      visitedSmall.add(current)
    }
  }

  steps.push(current)

  if (current === target) {
    return true
  }

  for (const link of current.links) {
    const linkVisitedSmall = new Set(visitedSmall)
    const linkSteps = [...steps]
    const found = findPath(link, target, linkSteps, linkVisitedSmall)
    if (found) {
      paths.push(linkSteps)
    }
  }
}

findPath(nodes.get('start'), nodes.get('end'), [], new Set())

console.log(paths.length)
