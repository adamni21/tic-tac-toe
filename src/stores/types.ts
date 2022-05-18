import type {
  Coordinates,
  FieldOwner,
  Player,
} from "src/components/Playfield/types";

export interface TicTacToeStore {
  size: number;
  running: boolean;
  currentState: FieldOwner[][];
  currentPlayer: Player;
  winner?: FieldOwner;
  moveCount: number;
}

export type ProcessClick = (coordinates: Coordinates) => Boolean