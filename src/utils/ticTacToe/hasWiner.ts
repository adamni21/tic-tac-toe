import type { BoardState, FieldOwner } from "./types";

const hasWinner = (state: BoardState): FieldOwner | null => {
  const size = state.length;
  let winner: FieldOwner = "_";
  const lastCol = size - 1;// required for second diagonal

  // base values/owners for cols and diags
  const columnOwners = [...state[0]];
  const diagonalOwners: FieldOwner[] = [
    state[0][0],
    state[0][lastCol],
  ];

  state.forEach((row, colInd) => {
    let RowOwner: FieldOwner = row[0];

    for (let i = 0; i < size; i++) {
      // set row to unconquered i.e. "_" if the mark of the current field is different from the previous fields
      if (RowOwner !== "_" && RowOwner !== row[i]) RowOwner = "_";
      // set column to unconquered i.e. "_" if the mark of the current field is different from the previous fields
      if (columnOwners[i] !== "_" && columnOwners[i] !== row[i])
        columnOwners[i] = "_";
    }

    // set diagonal one to unconquered i.e. "_" if the mark of the current field is different from the previous fields
    if (diagonalOwners[0] !== row[colInd]) diagonalOwners[0] = "_";
    // set diagonal two to unconquered i.e. "_" if the mark of the current field is different from the previous fields
    if (diagonalOwners[1] !== row[lastCol - colInd]) diagonalOwners[1] = "_";
    if (RowOwner !== "_") {
      winner = RowOwner;
      return winner;
    }
  });

  // checking for uniform column
  columnOwners.forEach((owner) => {
    if (owner !== "_") winner = owner;
  });
  // checking for uniform diagonal
  diagonalOwners.forEach((owner) => {
    if (owner !== "_") winner = owner;
  });

  return winner === "_" ? null : winner;
};

export default hasWinner