import getSquareArray from "../utils/getSquareArray";
import { writable } from "svelte/store";
import type { ProcessClick, TicTacToeStore } from "./types";
import { hasWinner } from "../utils/ticTacToeUtils";
import type { Player } from "../components/Playfield/types";

const init: TicTacToeStore = {
  size: 3,
  currentPlayer: "x",
  currentState: getSquareArray(3, ""),
  gameRunning: false,
  moveCount: 0,
  winner: "",
};

function createTicTacToe() {
  const { subscribe, update } = writable(init);

  const processClick: ProcessClick = ({ x, y }) => {
    let validMove: Boolean;

    update((game) => {
      if (game.currentState[x][y] !== "" || !game.gameRunning) {
        validMove = false;
        return game;
      }

      game.currentState[x][y] = game.currentPlayer;
      game.currentPlayer = game.currentPlayer === "o" ? "x" : "o";
      game.moveCount++;

      const enoughMoves: Boolean = game.moveCount >= game.size * 2 - 1;
      if (enoughMoves) {
        game.winner = hasWinner(game.currentState);
        game.gameRunning = game.winner === "";
        
      }

      validMove = true;
      return game;
    });

    return validMove;
  };

  const startNewGame = (startingPlayer: Player = "x") => {
    update((game) => {
      game.currentState = getSquareArray(game.size, "");
      game.currentPlayer = startingPlayer;
      game.winner = "";
      game.moveCount = 0;
      game.gameRunning = true;

      return game;
    });
  };

  return { subscribe, processClick, startNewGame };
}
// const game = writable({
//   size: 3,
//   leastMovesToWin: 5, // size * 2 - 1
//   gameRunning: false,
//   winner: "",
//   moveCount: 0,
//   processClick: ({x,y}) => {
//     if (this.currentState[x][y] !== "" || !this.gameRunning) return false;

//     this.currentState[x][y] = this.currentPlayer;
//     this.currentPlayer = this.currentPlayer === "o" ? "x" : "o";
//     this.moveCount++;

//     if (this.moveCount >= this.leastMovesToWin && this.hasWinner() !== "")
//       this.gameRunning = false;

//     return true;
//   }
// })

export const ticTacToe = createTicTacToe();
