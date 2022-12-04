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
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const invalids = []

for (let i = 0; i < input.length; i++) {
  const row = input[i]
  const stack = []
  for (let j = 0; j < row.length; j++) {
    const char = row[j]
    if (char in openCloseMap) {
      stack.push(char)
    } else {
      const prev = stack.pop()
      if (closeOpenMap[char] !== prev) {
        invalids.push(char)
      }
    }
  }
}

console.log(
  invalids.reduce((acc, val) => {
    return acc + scoreMap[val]
  }, 0)
)
