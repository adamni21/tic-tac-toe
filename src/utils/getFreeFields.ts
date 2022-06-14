import type { Coordinates, FieldOwner } from "./ticTacToe/types";

const getFreeFields = (state: FieldOwner[][]): Coordinates[] => {
  const sideLength = state.length;
  const freeFields: Coordinates[] = [];
  for (let row = 0; row < sideLength; row++) {
    for (let col = 0; col < sideLength; col++)
      if (state[row][col] === "_") freeFields.push({ row, col });
  }
  return freeFields
};

export default getFreeFields