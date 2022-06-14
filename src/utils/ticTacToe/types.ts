export type Mark = "x" | "o";
export type FieldOwner = Mark | "_";
export type AiDifficulty = "0" | "1" | "2";
export interface Coordinates {
  row: number;
  col: number;
}

export interface Ratings {
  rows: number[];
  columns: number[];
  diagonals: number[];
}