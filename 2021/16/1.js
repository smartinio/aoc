const input = require('./input.txt')
  .split('')
  .map((hex) => parseInt(hex, 16).toString(2))
  .map((binary) => binary.padStart(4, '0'))
  .join('')
  .split('')

const MINIMUM_PACKAGE_LENGTH = 10

function parseNBits(n) {
  const binary = input.splice(0, n).join('')
  return parseInt(binary, 2)
}

function createLiteral() {
  let binary = ''

  while (true) {
    const [prefix, ...digits] = input.splice(0, 5)
    binary += digits.join('')
    if (prefix === '0') break
  }

  return {
    type: 'literal',
    value: parseInt(binary, 2),
  }
}

function createOperator() {
  const lengthTypeId = parseNBits(1)
  let subPackets = []

  if (lengthTypeId === 0) {
    const subPacketBitLength = parseNBits(15)
    const current = input.length
    while (
      current - input.length <
      subPacketBitLength - MINIMUM_PACKAGE_LENGTH
      ) {
      parseNextPacket(subPackets)
    }
  } else {
    const numSubPackets = parseNBits(11)
    while (subPackets.length < numSubPackets) {
      parseNextPacket(subPackets)
    }
  }

  return {
    type: 'operator',
    value: subPackets,
  }
}

let versionSum = 0

function parseNextPacket(packets) {
  const version = parseNBits(3)
  const typeId = parseNBits(3)

  versionSum += version

  if (typeId === 4) {
    const literal = createLiteral()
    packets.push(literal)
  } else {
    const operator = createOperator()
    packets.push(operator)
  }
}

const outerPackets = []

while (input.length > MINIMUM_PACKAGE_LENGTH) {
  parseNextPacket(outerPackets)
}

console.log('output', versionSum)
