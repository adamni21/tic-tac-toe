import getSquareArray from "../../utils/getSquareArray";
import { writable } from "svelte/store";
import type { GameSettings, Player, ProcessClick, TicTacToeStore } from "./types";
import { aiMove, hasWinner } from "./utils";

const init: TicTacToeStore = {
  size: 3,
  aiMark: null,
  currentPlayer: "x",
  currentState: getSquareArray(3, "_"),
  running: false,
  moveCount: 0,
  winner: null,
};

function createTicTacToe() {
  const { subscribe, update } = writable(init);

  const checkForWinner = (game: TicTacToeStore): void => {
    const enoughMoves: boolean = game.moveCount >= game.size * 2 - 1;
    if (enoughMoves) {
      game.winner = hasWinner(game.currentState);
      if (game.moveCount === game.size ** 2 && game.winner === null)
        game.winner = "_";
      game.running = game.winner === null;
    }
  }

  const processClick: ProcessClick = ({ x, y }) => {
    let validMove: boolean;
    let aiHasToMove = false;

    update((game) => {
      if (game.currentState[x][y] !== "_" || !game.running || game.aiMark === game.currentPlayer) {
        validMove = false;
        return game;
      }

      game.currentState[x][y] = game.currentPlayer;
      game.currentPlayer = game.currentPlayer === "o" ? "x" : "o";
      game.moveCount++;

      checkForWinner(game)

      if(!game.winner && game.aiMark === game.currentPlayer) aiHasToMove = true

      validMove = true;
      return game;
    });

    if (aiHasToMove) {
      update(game => {
        const {x, y} = aiMove(game.currentState)
        game.currentState[x][y] = game.currentPlayer;
        game.currentPlayer = game.currentPlayer === "o" ? "x" : "o";
        game.moveCount++;
  
        checkForWinner(game)

        return game
      })
    }

    return validMove;
  };


  const startNewGame = (startingPlayer: Player = "x") => {
    update((game) => {
      game.currentState = getSquareArray(game.size, "_");
      game.currentPlayer = startingPlayer;
      game.winner = null;
      game.moveCount = 0;
      game.running = true;

      return game;
    });
  };

  const configureGame = (newSettings: GameSettings): void => {
    update((game) => {
      if(game.running) return game
      return {...game, ...newSettings}
    })
  }

  return { subscribe, processClick, startNewGame };
}

export const ticTacToe = createTicTacToe();
