export const flatMap = (iterable, mapFn) =>
  [...iterable].map(mapFn)
  .reduce((result, subCollection) => result.concat(subCollection), [])
