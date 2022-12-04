const input = require('./input.txt')
  .split('')
  .map((hex) => parseInt(hex, 16).toString(2))
  .map((binary) => binary.padStart(4, '0'))
  .join('')
  .split('')

const MINIMUM_PACKAGE_LENGTH = 10

const resolve = (packet) => {
  if (packet.type === 'operator') {
    return operationsByTypeId[packet.typeId](packet.subPackets)
  } else {
    return packet.value
  }
}

const operationsByTypeId = {
  0: (packets) => packets.map(resolve).reduce((acc, n) => acc + n, 0),
  1: (packets) => packets.map(resolve).reduce((acc, n) => acc * n, 1),
  2: (packets) => Math.min(...packets.map(resolve)),
  3: (packets) => Math.max(...packets.map(resolve)),
  5: ([a, b]) => (resolve(a) > resolve(b) ? 1 : 0),
  6: ([a, b]) => (resolve(a) < resolve(b) ? 1 : 0),
  7: ([a, b]) => (resolve(a) === resolve(b) ? 1 : 0),
}

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

function createOperator(typeId) {
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
    typeId,
    subPackets,
  }
}

function parseNextPacket(packets) {
  input.splice(0, 3) // trim away package version
  const typeId = parseNBits(3)
  
  if (typeId === 4) {
    const literal = createLiteral()
    packets.push(literal)
  } else {
    const operator = createOperator(typeId)
    packets.push(operator)
  }
}

const outerPackets = []

while (input.length > MINIMUM_PACKAGE_LENGTH) {
  parseNextPacket(outerPackets)
}

console.log('output', resolve(outerPackets[0]))
