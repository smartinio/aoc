const input = require('./input.txt')
const draws = input.substring(0, input.indexOf('\n')).split(',').map(Number)
const boards = input
  .substring(input.indexOf('\n') + 1, input.length)
  .split(/\n{2}/)
  .map((v) => v.split('\n').filter(Boolean))
  .map((v) =>
    v.map((w) =>
      w
        .split(/\s+/)
        .filter(Boolean)
        .map(Number)
        .map((n) => ({ value: n }))
    )
  )

const transpose = (rows) => rows[0].map((_, i) => rows.map((row) => row[i]))

const calculateWin = ({ board, draws }) => {
  const rows = board
  const cols = transpose(rows)

  for (let i = 0; i < draws.length; i++) {
    const draw = draws[i]

    for (const row of rows) {
      const idx = row.findIndex((v) => v.value === draw)
      if (idx !== -1) {
        row[idx].value = 'BINGO'
      }
    }

    if (rows.find((row) => row.every((x) => x.value === 'BINGO'))) {
      return { drawNo: i, winningDraw: draw, board }
    }
    if (cols.find((col) => col.every((x) => x.value === 'BINGO'))) {
      return { drawNo: i, winningDraw: draw, board }
    }
  }

  return { drawNo: null, winningDraw: null, board }
}

const [{ drawNo, winningDraw, board }] = boards
  .map((board) => calculateWin({ board, draws }))
  .sort((a, b) => a.drawNo - b.drawNo)

const sum = board.reduce((acc, row) => {
  return (
    acc +
    row.filter((x) => x.value !== 'BINGO').reduce((acc, x) => acc + x.value, 0)
  )
}, 0)

console.log({
  sum,
  drawNo,
  winningDraw,
  answer: sum * winningDraw,
})
