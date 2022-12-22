# Advent of Code

My solutions and dev setup for AoC in vanilla NodeJS.

I'll probably never do more than about half of the problems.

The solutions need to run via [`yarn code`](#run-code) due to the following global patches:

## Global patches

See [`scripts/globals.js`](https://github.com/smartinio/aoc/blob/main/scripts/globals.js) for more info

- `require` is patched to support importing `.txt` files
- `log` pretty prints data structures in full
- `range` works like in [python](https://www.w3schools.com/python/ref_func_range.asp)

## Setup

```bash
yarn
```

## Scaffold new solution

Year and date defaults to today.

```bash
yarn new [-y, --year <n>] [-d, --day <n>]
# e.g. yarn new -y 2022 -d 4
```

For help:

```bash
yarn new --help
```

## Run code

Year and date defaults to today.
Part defaults to 1. Can watch for changes.

```bash
yarn code [-w, --watch] [-y, --year <n>] [-d, --day <n>] [-p, --part <n>]
# e.g. yarn code --watch -y 2022 -d 1 -p 1
```

For help:

```bash
yarn code --help
```
