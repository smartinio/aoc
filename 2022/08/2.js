const grid = require('./input.txt')
  .split('\n')
  .map((x) => x.split('').map((x) => ({ height: Number(x), score: 1 })))

const transpose = (matrix) => {
  return matrix[0].map((_, column) => matrix.map((row) => row[column]))
}

const getViewingDistance = (tree, index, indexByHeight) => {
  if (index === 0) return 0

  let maxViewingDistance = index

  for (let i = tree.height; i < 10; i++) {
    const blockingIndex = indexByHeight[i] || 0
    const distance = index - blockingIndex
    if (distance === 1) return 1
    if (distance < maxViewingDistance) maxViewingDistance = distance
  }

  return maxViewingDistance
}

const multiplyScores = (indexByHeight, tree, index) => {
  tree.score *= getViewingDistance(tree, index, indexByHeight)
  indexByHeight[tree.height] = index
  return indexByHeight
}

const checkBothDirections = (trees) => {
  trees.reduce(multiplyScores, {})
  trees.slice().reverse().reduce(multiplyScores, {})
}

grid.forEach(checkBothDirections)

transpose(grid).forEach(checkBothDirections)

const [tree] = grid.flat().sort((a, b) => b.score - a.score)

console.log({ result: tree.score })
