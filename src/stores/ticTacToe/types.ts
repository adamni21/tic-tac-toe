export type FieldOwner = Player | "_";
export type Player = "x" | "o";
export interface Coordinates {
  x: number;
  y: number;
}

export interface GameSettings {
  size: number;
  aiMark?: Player;
  currentPlayer: Player;
}

export interface TicTacToeStore extends GameSettings {
  running: boolean;
  currentState: FieldOwner[][];
  winner?: FieldOwner;
  moveCount: number;
}

export type ProcessClick = (coordinates: Coordinates) => Boolean