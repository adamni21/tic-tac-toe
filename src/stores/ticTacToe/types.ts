import type {
  AiDifficulty,
  BoardState,
  FieldOwner,
  Mark,
} from "../../utils/ticTacToe/types";

export interface Players {
  x: string;
  o: string;
}

export interface GameSettings {
  size: number;
  players: Players;
  startingPlayer: Mark;
  singlePlayer: boolean;
  aiMark: Mark;
  aiDifficulty: AiDifficulty;
}

export interface UpdatedSettings
  extends Partial<Omit<GameSettings, "players">> {
  players?: Partial<Players>;
}

export interface TicTacToeStore extends GameSettings {
  running: boolean;
  score: { x: number; o: number };
  currentPlayer: Mark;
  currentBoard: BoardState;
  winner?: FieldOwner;
  moveCount: number;
}
