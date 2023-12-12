function memo(getKey, fn) {
  const cache = new Map()

  return function (...args) {
    const key = getKey(...args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn(...args)

    cache.set(key, result)

    return result
  }
}

module.exports = {
  memo,
}
