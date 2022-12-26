const blueprints = require('./input.txt')
  .split('\n')
  .map((line) => line.match(/\d+/g))
  .map(([blueprint, oreOre, clayOre, obsOre, obsClay, geodeOre, geodeObs]) => ({
    id: Number(blueprint),
    ore: [{ amount: Number(oreOre), currency: 'ore' }],
    clay: [{ amount: Number(clayOre), currency: 'ore' }],
    obs: [
      { amount: Number(obsOre), currency: 'ore' },
      { amount: Number(obsClay), currency: 'clay' },
    ],
    geode: [
      { amount: Number(geodeOre), currency: 'ore' },
      { amount: Number(geodeObs), currency: 'obs' },
    ],
  }))

function isBuildable(robot, blueprint, bOre, bClay, bObs) {
  for (const { amount, currency } of blueprint[robot]) {
    if (currency === 'ore' && amount > bOre) return false
    if (currency === 'clay' && amount > bClay) return false
    if (currency === 'obs' && amount > bObs) return false
  }
  return true
}

function getBuildableRobots(blueprint, bOre, bClay, bObs, rOre) {
  const canBuild = (robot) => isBuildable(robot, blueprint, bOre, bClay, bObs)

  if (canBuild('geode')) return ['geode']
  if (canBuild('obs')) return ['obs']

  const buildable = []

  if (canBuild('clay')) {
    const [obsOre] = blueprint.obs
    if (rOre > obsOre.amount) return ['clay']
    else buildable.push('clay')
  }

  if (canBuild('ore')) buildable.push('ore')

  return buildable
}

function payFor(cost, bOre, bClay, bObs, bGeode, rOre, rClay, rObs, rGeode) {
  for (const { amount, currency } of cost) {
    if (currency === 'ore') bOre -= amount
    if (currency === 'clay') bClay -= amount
    if (currency === 'obs') bObs -= amount
  }

  return [bOre, bClay, bObs, bGeode, rOre, rClay, rObs, rGeode]
}

function wait(bOre, bClay, bObs, bGeode, rOre, rClay, rObs, rGeode) {
  bOre += rOre
  bClay += rClay
  bObs += rObs
  bGeode += rGeode

  return [bOre, bClay, bObs, bGeode, rOre, rClay, rObs, rGeode]
}

function complete(robot, bOre, bClay, bObs, bGeode, rOre, rClay, rObs, rGeode) {
  if (robot === 'ore') rOre++
  if (robot === 'clay') rClay++
  if (robot === 'obs') rObs++
  if (robot === 'geode') rGeode++

  return [bOre, bClay, bObs, bGeode, rOre, rClay, rObs, rGeode]
}

function hash(...ints) {
  return ints.reduce((key, int, i) => key | (int << (i * 10)))
}

function maxGeodes(
  blueprint,
  cache,
  time,

  bOre = 0, // balance: ore
  bClay = 0, // balance: clay
  bObs = 0, // balance: obsidian
  bGeode = 0, // balance: geode

  rOre = 1, // robots: ore
  rClay = 0, // robots: clay
  rObs = 0, // robots: obsidian
  rGeode = 0 // robots: geode
) {
  if (time === 0) return bGeode

  const key = hash(time, bOre, bClay, bObs, bGeode, rOre, rClay, rObs)

  if (cache.has(key)) return cache.get(key)

  const buildableRobots = getBuildableRobots(blueprint, bOre, bClay, bObs, rOre)

  const options = []

  // option A: create new robot
  for (const robot of buildableRobots) {
    const paidState = payFor(
      blueprint[robot],
      bOre,
      bClay,
      bObs,
      bGeode,
      rOre,
      rClay,
      rObs,
      rGeode
    )
    const waitedState = wait(...paidState)
    const nextState = complete(robot, ...waitedState)
    const option = maxGeodes(blueprint, cache, time - 1, ...nextState)
    options.push(option)
  }

  // option B: just wait
  const nextState = wait(bOre, bClay, bObs, bGeode, rOre, rClay, rObs, rGeode)
  const option = maxGeodes(blueprint, cache, time - 1, ...nextState)
  options.push(option)

  const result = Math.max(...options)

  cache.set(key, result)

  return result
}

const results = blueprints.map((blueprint) => ({
  id: blueprint.id,
  max: maxGeodes(blueprint, new Map(), 24),
}))

log({ result: results.reduce((sum, { id, max }) => sum + id * max, 0) })
