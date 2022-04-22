import type { Coordinates, FieldOwner, Player } from "src/lib/Playfield/types";
import getSquareArray from "./getSquareArray";

export class ticTacToeGame {
  constructor(playfieldSize = 3) {
    this.size = playfieldSize;
    this.gameRunning = false;
  }
  size: number;

  gameRunning: Boolean;
  currentState: FieldOwner[][];
  currentPlayer: Player;
  moveCount: number;

  startNewGame(firstPlayer: Player = "x") {
    this.currentState = getSquareArray(this.size, "");
    this.currentPlayer = firstPlayer;
    this.moveCount = 0;
    this.gameRunning = true;
    console.log(this.gameRunning);

    return this;
  }

  hasWinner(): FieldOwner {
    let winner: FieldOwner = "";
    const columnOwners = [...this.currentState[0]];
    const lastIndex = this.size - 1;
    const diagonalOwners: FieldOwner[] = [
      this.currentState[0][0],
      this.currentState[lastIndex][lastIndex],
    ];

    this.currentState.forEach((row, colInd) => {
      let RowOwner: FieldOwner = row[0];

      for (let i = 0; i < this.size; i++) {
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
        return;
      }
    });
    // checking for uniform diagonal
    diagonalOwners.forEach((owner) => {
      if (owner !== "") {
        winner = owner;
        return;
      }
    });
    return winner;
  }

  processClick({ x, y }: Coordinates): Boolean {
    if (this.currentState[x][y] !== "" || !this.gameRunning) return false;

    this.currentState[x][y] = this.currentPlayer;
    this.currentPlayer = this.currentPlayer === "o" ? "x" : "o";
    this.moveCount++;

    if (this.moveCount >= 5 && this.hasWinner() !== "")
      this.gameRunning = false;

    return true;
  }
}
