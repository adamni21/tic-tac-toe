const randomElemOf = <T>(iterable: Iterable<T>): T=> {
  if (iterable[Symbol.iterator]().next().done) return null
  const temp = [...iterable];
  return temp[Math.floor(Math.random() * temp.length)];
};

export default randomElemOf;
