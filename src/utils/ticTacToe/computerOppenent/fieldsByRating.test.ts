import { expect, test, describe } from "vitest";
import getFreeFields from "../../getFreeFields";
import type { FieldOwner, Ratings } from "../types";
import fieldsByRating from "./fieldsByRating";

const state: FieldOwner[][] = [
  ["x", "x", "_", "_"],
  ["_", "x", "o", "x"],
  ["_", "o", "_", "_"],
  ["o", "o", "_", "_"],
];
const xRatings: Ratings = {
  rows: [2, -1, -1, -1],
  columns: [-1, -1, -1, 1],
  diagonals: [2, -1],
};
const freeFields = getFreeFields(state);

describe("returned coordinates for respective xRating to be correct", () => {
  test("rating 2", () => {
    expect(fieldsByRating(2, xRatings, freeFields)).toEqual([
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 2, col: 2 },
      { row: 3, col: 3 },
    ]);
  });

  test("rating 1", () => {
    expect(fieldsByRating(1, xRatings, freeFields)).toEqual([
      { row: 0, col: 3 },
      { row: 2, col: 3 },
      { row: 3, col: 3 },
    ]);
  });
  
  test("rating -1", () => {
    expect(fieldsByRating(-1, xRatings, freeFields)).toEqual(freeFields);
  });
});

const oRatings: Ratings = {
  rows: [-1, -1, 1, 2],
  columns: [-1, -1, -1, -1],
  diagonals: [-1, 3],
};

describe("returned coordinates for respective oRating to be correct", () => {
  test("rating 3", () => {
    expect(fieldsByRating(3, oRatings, freeFields)).toEqual([
      { row: 0, col: 3 },
    ]);
  });

  test("rating 2", () => {
    expect(fieldsByRating(2, oRatings, freeFields)).toEqual([
      { row: 3, col: 2 },
      { row: 3, col: 3 },
    ]);
  });

  test("rating 1", () => {
    expect(fieldsByRating(1, oRatings, freeFields)).toEqual([
      { row: 2, col: 0 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
    ]);
  });

  test("rating -1", () => {
    expect(fieldsByRating(-1, oRatings, freeFields)).toEqual(freeFields);
  });
});

