class PriorityQueue {
  constructor() {
    this.priority = -1
    this.next = null
    this.last = null
    this.links = new WeakMap()
  }

  get hasMore() {
    return Boolean(this.next)
  }

  setPriority(node, priority) {
    const link = this.links.get(node)
    link.priority = priority

    let oldNext = link.next
    let oldPrev = link.prev
    let curr = link.prev

    while (curr) {
      if (curr.priority > link.priority) {
        curr = curr.prev
      } else {
        if (oldNext) oldNext.prev = oldPrev
        if (oldPrev) oldPrev.next = oldNext
        if (curr.next) curr.next.prev = link
        link.next = curr.next
        link.prev = curr
        curr.next = link
        break
      }
    }
  }

  enqueue(node) {
    const newLeaf = {
      value: node,
      priority: Infinity,
      next: null,
      prev: null,
    }

    this.links.set(node, newLeaf)

    let last = this.last || this
    this.last = newLeaf
    last.next = this.last
    this.last.prev = last
  }

  dequeue() {
    const curr = this.next
    this.next = curr.next
    if (this.next) this.next.prev = this
    curr.next = null
    curr.prev = null
    return curr.value
  }
}

module.exports = PriorityQueue
