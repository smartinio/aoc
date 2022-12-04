const input = require('./input.txt')
  .split('\n')
  .filter(Boolean)
  .map((row) => row.split(''))

const openCloseMap = {
  '{': '}',
  '<': '>',
  '(': ')',
  '[': ']',
}

const closeOpenMap = {
  '}': '{',
  '>': '<',
  ')': '(',
  ']': '[',
}

const scoreMap = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const incomplete = []

for (let i = 0; i < input.length; i++) {
  const row = input[i]
  const stack = []
  let isInvalid = false
  for (let j = 0; j < row.length; j++) {
    const char = row[j]
    if (char in openCloseMap) {
      stack.push(char)
    } else {
      const prev = stack.pop()
      if (closeOpenMap[char] !== prev) {
        isInvalid = true
      }
    }
  }
  if (!isInvalid) {
    incomplete.push(row)
  }
}

const scores = []

for (let i = 0; i < incomplete.length; i++) {
  const row = incomplete[i]
  const stack = []

  for (let j = 0; j < row.length; j++) {
    const char = row[j]
    if (char in openCloseMap) {
      stack.unshift(openCloseMap[char])
    } else {
      stack.shift()
    }
  }

  const score = stack.reduce((acc, v) => {
    return acc * 5 + scoreMap[v]
  }, 0)

  scores.push(score)
}

scores.sort((a, b) => b - a)

const middleIndex = Math.floor(scores.length / 2)
console.log({
  middleIndex,
  scores,
  winner: scores[middleIndex],
})
