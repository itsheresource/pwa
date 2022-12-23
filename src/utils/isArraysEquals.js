//gets 2 arrays and return boolean.

export const isArraysEquals = (a, b) =>
  a.length === b.length && a.every((v, i) => v === b[i]);
