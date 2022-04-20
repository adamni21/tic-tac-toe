export default function getSquareArray<T>(sideLength: number, initValue: T): T[][] {
  const array = []
  for (let x = 0; x < sideLength; x++) {
    const bufferArray = []
    for (let y = 0; y < sideLength; y++){
      bufferArray.push(initValue)
    }
    array.push(bufferArray)
  }
  return array
}