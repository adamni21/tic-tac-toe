import { expect, test } from "vitest";
import getFreeFields from "./getFreeFields";
import type { FieldOwner } from "./types";

const state: FieldOwner[][] = [
  ["_", "o", "_"],
  ["x", "x", "_"],
  ["_", "o", "x"],
];
const freeFields = getFreeFields(state);

test("returned coordinates contain all free fields", () => {
  expect(freeFields).toContainEqual({ row: 0, col: 0 })
  expect(freeFields).toContainEqual({ row: 0, col: 2 })
  expect(freeFields).toContainEqual({ row: 1, col: 2 })
  expect(freeFields).toContainEqual({ row: 2, col: 0 })
});

test("returned coordinates contain no occupied fields", () => {
  expect(freeFields).not.toContainEqual({ row: 0, col: 1 })
  expect(freeFields).not.toContainEqual({ row: 1, col: 0 })
  expect(freeFields).not.toContainEqual({ row: 1, col: 1 })
  expect(freeFields).not.toContainEqual({ row: 2, col: 1 })
  expect(freeFields).not.toContainEqual({ row: 2, col: 2 })
});
