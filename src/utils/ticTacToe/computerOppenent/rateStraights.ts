import type { FieldOwner, Mark, Ratings } from "../types";

/* rates all straights (rows/columns/diagonals) and returns ratings and array of free fields
   rating = if (straight contains other mark): -1; else: 1 * ownMark */
/* rates all straights (rows/columns/diagonals) and returns ratings and array of free fields
   rating = if (straight contains other mark): -1; else: 1 * ownMark */
const rateStraights = (currentState: FieldOwner[][], mark: Mark): Ratings => {
  const sideLength = currentState.length;
  const lastIndex = sideLength - 1;

  const rows = new Array(sideLength).fill(0);
  const columns = new Array(sideLength).fill(0);
  const diagonals = [0, 0];

  // rate all straights
  for (let row = 0; row < sideLength; row++) {
    for (let col = 0; col < sideLength; col++) {
      // update rating of respective row, column and diagonal/s of current field according to mark/owner
      // own mark
      if (currentState[row][col] === mark) {
        if (rows[row] !== -1) rows[row]++;
        if (columns[col] !== -1) columns[col]++;
        // diagonal 0
        if (row === col && diagonals[0] !== -1) diagonals[0]++;
        // diagonal 1
        if (row === lastIndex - col && diagonals[1] !== -1) diagonals[1]++;
      }
      // opponents mark
      else if (currentState[row][col] !== "_") {
        rows[row] = -1;
        columns[col] = -1;
        if (row === col) diagonals[0] = -1;
        if (row === lastIndex - col) diagonals[1] = -1;
      }
    }
  }
  return { rows, columns, diagonals };
};

export default rateStraights;
