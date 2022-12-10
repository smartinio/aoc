const grid = require('./input.txt')
  .split('\n')
  .map((x) => x.split('').map((x) => ({ height: Number(x) })))

const visibles = new Set()

const transpose = (matrix) => {
  return matrix[0].map((_, column) => matrix.map((row) => row[column]))
}

const addVisibles = (lastVisible, tree) => {
  if (tree.height <= lastVisible.height) return lastVisible
  visibles.add(tree)
  return tree
}

const checkBothDirections = (trees) => {
  trees.reduce(addVisibles, { height: -1 })
  trees.reduceRight(addVisibles, { height: -1 })
}

grid.forEach(checkBothDirections)

transpose(grid).forEach(checkBothDirections)

console.log({ result: visibles.size })
