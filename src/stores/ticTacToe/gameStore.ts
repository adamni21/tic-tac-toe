import getSquareArray from "../../utils/ticTacToe/getSquareArray";
import { get, writable } from "svelte/store";
import type { TicTacToeStore } from "./types";
import aiMove from "../../utils/ticTacToe/computerOppenent/aiMove";
import { gameSettings, settingsInit } from "./settingsStore";
import type { Coordinates } from "../../utils/ticTacToe/types";
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
  const { subscribe, update } = writable(init);

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
      // break if the field is already occupied
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

  const startNewGame = () => {
    const settings = get(gameSettings);

    update((game) => {
      game.currentBoard = getSquareArray(settings.size, "_");
      game.currentPlayer = settings.startingPlayer;
      game.winner = null;
      game.moveCount = 0;
      game.running = true;

      return { ...game, ...settings };
    });
  };

  return { subscribe, processClick, triggerAiMove, startNewGame };
}

export const ticTacToe = createTicTacToe();
