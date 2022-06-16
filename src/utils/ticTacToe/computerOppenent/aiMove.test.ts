import { describe, expect, test } from "vitest";
import type { BoardState } from "../types";
import aiMove from "./aiMove";

describe("difficulty 1 and 2 to continue best straight", () => {
  const state: BoardState = [
    ["_", "_", "_"],
    ["o", "_", "_"],
    ["x", "x", "_"],
  ];

  test("difficulty 2", () => {
    expect(aiMove(state, "2", "o", "x")).toEqual([{ row: 2, col: 2 }]);
  });
  test("difficulty 1", () => {
    expect(aiMove(state, "1", "o", "x")).toEqual([
      { row: 1, col: 1 },
      { row: 1, col: 2 },
    ]);
  });
});

describe("difficulty 2 to win", () => {
  const state: BoardState = [
    ["_", "_", "_"],
    ["x", "_", "o"],
    ["x", "x", "o"],
  ];

  test("difficulty 2", () => {
    expect(aiMove(state, "2", "o", "x")).toEqual([{ row: 0, col: 2 }]);
  });

  test("difficulty 1", () => {
    expect(aiMove(state, "1", "o", "x")).toEqual([{ row: 0, col: 2 }]);
  });
});
