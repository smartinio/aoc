const monkeys = require('./input.txt')
  .split('\n\n')
  .map((monkey) => monkey.split('\n').slice(1))
  .map((attrs) => attrs.map((attr) => attr.split(': ')[1]))
  .map(([startingItems, operation, test, ifTrue, ifFalse], i) => ({
    id: i,
    items: startingItems.split(', ').map((n) => ({ worry: Number(n) })),
    operation: operation.split('new = old ')[1].split(' '),
    modTest: Number(test.split('divisible by ')[1]),
    modTestTrueMonkey: Number(ifTrue.split('throw to monkey ')[1]),
    modTestFalseMonkey: Number(ifFalse.split('throw to monkey ')[1]),
  }))

const inspects = Object.fromEntries(monkeys.map(({ id }) => [id, 0]))

const reductionFactor = monkeys.reduce((acc, m) => acc * m.modTest, 1)

const inspect = (monkey) => {
  if (!monkey.items.length) return

  const { items, operation, modTest, modTestTrueMonkey, modTestFalseMonkey } =
    monkey

  const [operator, val] = operation

  for (const item of items) {
    const factor = val === 'old' ? item.worry : Number(val)

    if (operator === '+') item.worry += factor
    if (operator === '*') item.worry *= factor

    item.worry = item.worry % reductionFactor

    const modTestTrue = item.worry % modTest === 0
    const throwMonkeyId = modTestTrue ? modTestTrueMonkey : modTestFalseMonkey

    monkeys[throwMonkeyId].items.push(item)
    inspects[monkey.id]++
  }

  monkey.items = []
}

for (let i = 1; i <= 10000; i++) {
  for (const monkey of monkeys) {
    inspect(monkey)
  }
}

const [monkeyA, monkeyB] = Object.values(inspects).sort((a, b) => b - a)

log({ result: monkeyA * monkeyB })
