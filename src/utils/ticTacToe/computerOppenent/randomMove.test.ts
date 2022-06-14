import { describe, expect, test } from "vitest";
import getSquareArray from "../getSquareArray";
import type { FieldOwner } from "../types";
import randomMove from "./randomMove";

describe("randomMove()", () => {
  test('returned coordinates to be free i.e. "_"', () => {
    const currentState = getSquareArray<FieldOwner>(3, "_");

    for (let i = 0; i < 9; i++) {
      const { row, col } = randomMove(currentState);
      expect(currentState[row][col]).toBe("_");
    }
  });

  test("throw error, if there are no free fields", () => {
    const currentState: FieldOwner[][] = [
      ["x", "o", "x"],
      ["x", "o", "o"],
      ["o", "x", "x"],
    ];

    expect(() => randomMove(currentState)).not.toBe(3);
  });
});
