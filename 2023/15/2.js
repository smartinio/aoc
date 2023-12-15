const input = require('./input.txt').split(',')
const boxes = Array.from({ length: 256 }).map(() => [])

for (const step of input) {
  const operation = step.match(/-|=/).at(0)
  const [label, f] = step.split(operation)

  let box = 0

  for (let i = 0; i < label.length; i++) {
    const code = label.charCodeAt(i)
    box += code
    box *= 17
    box = box % 256
  }

  let lenses = boxes[box]

  if (operation === '-') {
    lenses = lenses.filter(([l]) => l !== label)
  } else {
    const existing = lenses.find(([l]) => l === label)
    if (!existing) lenses.push([label, Number(f)])
    else existing[1] = Number(f)
  }

  boxes[box] = lenses
}

const result = boxes
  .map((lenses, box) =>
    lenses.reduce((sum, [_, focal], slot) => {
      return sum + (1 + box) * (1 + slot) * focal
    }, 0)
  )
  .reduce((sum, power) => sum + power, 0)

log({ result })
