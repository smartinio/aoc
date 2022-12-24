const N = 4

module.exports = {
  N,
  mappings: ({ x, y, f }) =>
    ({
      1: {
        '^': {
          face: 2,
          facing: 'v',
          x: N - 1 - x,
          y: 0,
        },
        v: {
          face: 4,
          facing: 'v',
          x,
          y: 0,
        },
        '<': {
          face: 3,
          facing: 'v',
          x: y,
          y: 0,
        },
        '>': {
          face: 6,
          facing: '<',
          x: N - 1,
          y: N - 1 - y,
        },
      },

      2: {
        '^': {
          face: 1,
          facing: 'v',
          x: N - 1 - x,
          y: 0,
        },
        v: {
          face: 5,
          facing: '^',
          x,
          y: N - 1,
        },
        '<': {
          face: 6,
          facing: '^',
          x: y,
          y: N - 1,
        },
        '>': {
          face: 3,
          facing: '>',
          x: 0,
          y,
        },
      },

      3: {
        '^': {
          face: 1,
          facing: '>',
          x: 0,
          y: x,
        },
        v: {
          face: 5,
          facing: '>',
          x: 0,
          y: N - 1 - x,
        },
        '<': {
          face: 2,
          facing: '<',
          x: N - 1,
          y,
        },
        '>': {
          face: 4,
          facing: '>',
          x: 0,
          y,
        },
      },

      4: {
        '^': {
          face: 1,
          facing: '^',
          x,
          y: N - 1,
        },
        v: {
          face: 5,
          facing: 'v',
          x,
          y: 0,
        },
        '<': {
          face: 3,
          facing: '<',
          x: N - 1,
          y,
        },
        '>': {
          face: 6,
          facing: 'v',
          x: N - 1 - y,
          y: 0,
        },
      },

      5: {
        '^': {
          face: 4,
          facing: '^',
          x,
          y: N - 1,
        },
        v: {
          face: 2,
          facing: '^',
          x: N - 1 - x,
          y: N - 1,
        },
        '<': {
          face: 3,
          facing: '^',
          x: N - 1 - y,
          y: N - 1,
        },
        '>': {
          face: 6,
          facing: '>',
          x: 0,
          y,
        },
      },

      6: {
        '^': {
          face: 4,
          facing: '<',
          x: N - 1,
          y: N - 1 - x,
        },
        v: {
          face: 2,
          facing: '>',
          x: 0,
          y: N - 1 - x,
        },
        '<': {
          face: 5,
          facing: '<',
          x: N - 1,
          y,
        },
        '>': {
          face: 1,
          facing: '<',
          x: N - 1,
          y: N - 1 - y,
        },
      },
    }[f]),
}
