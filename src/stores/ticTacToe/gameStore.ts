import getSquareArray from "../../utils/getSquareArray";
import { get, writable } from "svelte/store";
import type { Coordinates, TicTacToeStore } from "./types";
import { aiMove, hasWinner } from "./utils";
import { gameSettings, settingsInit } from "./settingsStore";

const init: TicTacToeStore = {
  ...settingsInit,
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
  };

  // sets owner of field currentState[row][col] to currentPlayer
  const setFieldOwner = ({ row, col }: Coordinates) => {
    update((game) => {
      // break if the field id already occupied
      if (game.currentState[row][col] !== "_" || !game.running) {
        return game;
      }

      game.currentState[row][col] = game.currentPlayer;
      game.currentPlayer = game.currentPlayer === "o" ? "x" : "o";
      game.moveCount++;

      checkForWinner(game);

      return game;
    });
  };

  const processClick = ({ row, col }: Coordinates) => {
    setFieldOwner({ row, col });
    const game = get(ticTacToe);
    if (game.singlePlayer && game.currentPlayer === game.aiMark && game.running)
      setFieldOwner(aiMove(game.currentState));
  };

  const startNewGame = () => {
    const settings = get(gameSettings);
    
    update((game) => {
      game.currentState = getSquareArray(settings.size, "_");
      game.currentPlayer = settings.startingPlayer;
      game.winner = null;
      game.moveCount = 0;
      game.running = true;

      return {...game, ...settings};
    });
  };

  return { subscribe, processClick, startNewGame };
}

export const ticTacToe = createTicTacToe();
