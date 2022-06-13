import type { Coordinates, FieldOwner } from "../types";

const randomMove = (currentState: FieldOwner[][]): Coordinates => {
  const sideLength = currentState.length;
  let row = Math.floor(Math.random() * sideLength);
  let col = Math.floor(Math.random() * sideLength);
  // find next free field from initial random coordinates defined above
  for (let r = 0; r < sideLength; r++) {
    for (let c = 0; c < sideLength; c++) {
      // return if field is free
      if (currentState[row][col] === "_") return { row, col };
      // try next field/col in current row (given a sideLength = 3, the next col after "2" is "0".)
      col = (col + 1) % sideLength;
    }
    // try next row (given a sideLength = 3, the next row after "2" is "0". )
    row = (row + 1) % sideLength;
  }

  throw new Error("all fields are already occupied");
};

export default randomMove;
