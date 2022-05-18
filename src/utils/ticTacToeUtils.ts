import type {
  FieldOwner,
} from "src/components/Playfield/types";

// startNewGame(firstPlayer: Player = "x") {
//   this.currentState = getSquareArray(this.size, "");
//   this.currentPlayer = firstPlayer;
//   this.winner = "";
//   this.moveCount = 0;
//   this.gameRunning = true;
//   console.log(this.gameRunning);

//   return this;
// }

type HasWinner = (currentState: FieldOwner[][]) => (FieldOwner | null);

export const hasWinner: HasWinner = (currentState) => {
  const size = currentState.length;
  let winner: FieldOwner = "";

  const columnOwners = [...currentState[0]];
  const lastIndex = size - 1;
  const diagonalOwners: FieldOwner[] = [
    currentState[0][0],
    currentState[0][lastIndex],
  ];

  currentState.forEach((row, colInd) => {
    let RowOwner: FieldOwner = row[0];

    for (let i = 0; i < size; i++) {
      // set row to unconquered i.e. '""' if the mark of the current field is different from the previous fields
      if (RowOwner !== "" && RowOwner !== row[i]) RowOwner = "";

      // set column to unconquered i.e. '""' if the mark of the current field is different from the previous fields
      if (columnOwners[i] !== "" && columnOwners[i] !== row[i])
        columnOwners[i] = "";
    }

    // set diagonal one to unconquered i.e. '""' if the mark of the current field is different from the previous fields
    if (diagonalOwners[0] !== row[colInd]) diagonalOwners[0] = "";

    // set diagonal two to unconquered i.e. '""' if the mark of the current field is different from the previous fields
    if (diagonalOwners[1] !== row[lastIndex - colInd]) diagonalOwners[1] = "";

    if (RowOwner !== "") {
      winner = RowOwner;
      return winner;
    }
  });

  // checking for uniform column
  columnOwners.forEach((owner) => {
    if (owner !== "") {
      winner = owner;
    }
  });
  // checking for uniform diagonal
  diagonalOwners.forEach((owner) => {
    if (owner !== "") {
      winner = owner;
      
      
    }
  });
  return winner === "" ? null : winner;
};
