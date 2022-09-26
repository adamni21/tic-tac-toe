import getSquareArray from "../../utils/ticTacToe/getSquareArray";
import { get, writable } from "svelte/store";
import type { GameSettings, TicTacToeStore } from "./types";
import aiMove from "../../utils/ticTacToe/computerOppenent/aiMove";
import { gameSettings, settingsInit } from "./settingsStore";
import type { Coordinates, Mark } from "../../utils/ticTacToe/types";
import hasWinner from "../../utils/ticTacToe/hasWiner";
import randomElemOf from "../../utils/randomElemOf";

const init: TicTacToeStore = {
  ...settingsInit,
  score: { x: 0, o: 0 },
  currentPlayer: "x",
  currentBoard: getSquareArray(3, "_"),
  running: false,
  moveCount: 0,
  winner: null,
};

function createTicTacToe() {
  const { subscribe, update, set } = writable(structuredClone(init));

  const checkForWinner = (game: TicTacToeStore): void => {
    const enoughMoves: boolean = game.moveCount >= game.size * 2 - 1;
    if (enoughMoves) {
      game.winner = hasWinner(game.currentBoard);
      if (game.moveCount === game.size ** 2 && game.winner === null)
        game.winner = "_";
      game.running = game.winner === null;
    }
  };

  // sets owner of field currentBoard[row][col] to currentPlayer
  const setFieldOwner = ({ row, col }: Coordinates) => {
    update((game) => {
      // return unchanged if the field is already occupied
      if (game.currentBoard[row][col] !== "_" || !game.running) {
        return game;
      }

      game.currentBoard[row][col] = game.currentPlayer;
      game.moveCount++;

      checkForWinner(game);
      // has not won
      if (game.running)
        game.currentPlayer = game.currentPlayer === "o" ? "x" : "o";
      // has won
      else if (game.winner !== "_") game.score[game.winner]++;

      return game;
    });
  };

  const processClick = ({ row, col }: Coordinates) => {
    const { singlePlayer, aiMark, currentPlayer } = get(ticTacToe);
    if (!singlePlayer || aiMark !== currentPlayer) setFieldOwner({ row, col });
  };

  const triggerAiMove = () => {
    const { currentBoard, aiMark, currentPlayer, aiDifficulty } =
      get(ticTacToe);
    setFieldOwner(
      randomElemOf(
        aiMove(
          currentBoard,
          aiDifficulty,
          aiMark,
          currentPlayer === "o" ? "x" : "o"
        )
      )
    );
  };

  const resetGame = () => {
    const currentSettings = get(gameSettings);

    set({
      ...structuredClone(init),
      ...currentSettings,
      currentBoard: getSquareArray(currentSettings.size, "_"),
    });
  };

  const startGame = (newGame = true) => {
    const settings: Partial<GameSettings> = newGame ? get(gameSettings) : {};

    update((game) => {
      const newStartingPlayer: Mark = game.startingPlayer === "x" ? "o" : "x";

      game.currentBoard = getSquareArray(settings.size || game.size, "_");
      game.currentPlayer = settings.startingPlayer || newStartingPlayer;
      game.startingPlayer = game.currentPlayer;
      game.winner = null;
      game.moveCount = 0;
      game.running = true;

      return { ...game, ...settings };
    });
  };

  return { subscribe, processClick, triggerAiMove, startGame, resetGame };
}

export const ticTacToe = createTicTacToe();
