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
const TWICE = Symbol('twice')

function findPath(current, target, steps, visitedSmall) {
  if (current.isSmall) {
    const visitedSomethingTwice = visitedSmall.get(TWICE) || false
    const visitCount = visitedSmall.get(current) || 0
    if (visitCount && visitedSomethingTwice) {
      return false
    } else if (visitCount && ['start', 'end'].includes(current.name)) {
      return false
    } else {
      visitedSmall.set(current, visitCount + 1)
      if (visitCount === 1) {
        visitedSmall.set(TWICE, true)
      }
    }
  }

  steps.push(current)

  if (current === target) {
    return true
  }

  for (const link of current.links) {
    const linkVisitedSmall = new Map(visitedSmall)
    const linkSteps = [...steps]
    const found = findPath(link, target, linkSteps, linkVisitedSmall)
    if (found) {
      paths.push(linkSteps)
    }
  }
}

findPath(nodes.get('start'), nodes.get('end'), [], new Map())

console.log(paths.length)
