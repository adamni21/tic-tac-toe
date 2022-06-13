import type { FieldOwner, Mark } from "../../utils/ticTacToe/types";

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
}

export interface UpdatedSettings
  extends Partial<Omit<GameSettings, "players">> {
  players?: Partial<Players>;
}

export interface TicTacToeStore extends GameSettings {
  running: boolean;
  currentPlayer: Mark;
  currentState: FieldOwner[][];
  winner?: FieldOwner;
  moveCount: number;
}

