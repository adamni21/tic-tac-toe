export type Mark = "x" | "o";
export type FieldOwner = Mark | "_";
export interface Coordinates {
  row: number;
  col: number;
}



export interface GameSettings {
  size: number;
  players: Map<Mark, string>;
  startingPlayer: Mark;
  singlePlayer: boolean;
  aiMark: Mark;
}

export interface TicTacToeStore extends GameSettings {
  running: boolean;
  currentPlayer: Mark;
  currentState: FieldOwner[][];
  winner?: FieldOwner;
  moveCount: number;
}

