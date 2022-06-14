import { describe, expect, test } from "vitest";
import type { FieldOwner } from "../types";
import rateStraights from "./rateStraights";

describe("rateStraights", () => {
  const currentState: FieldOwner[][] = [
    ["o", "_", "_", "_"],
    ["o", "_", "x", "o"],
    ["x", "x", "o", "_"],
    ["x", "x", "_", "_"],
  ];
  const x = rateStraights(currentState, "x");
  const o = rateStraights(currentState, "o");

  test("ratings of rows to be correct", () => {
    const xRows = x.rows;
    const oRows = o.rows;
    expect(xRows[0]).toBe(-1);
    expect(xRows[1]).toBe(-1);
    expect(xRows[2]).toBe(-1);
    expect(xRows[3]).toBe(2);
    expect(oRows[0]).toBe(1);
    expect(oRows[1]).toBe(-1);
    expect(oRows[2]).toBe(-1);
    expect(oRows[3]).toBe(-1);
  });

  test("ratings of columns to be correct", () => {
    const xColumns = x.columns;
    const oColumns = o.columns;
    expect(xColumns[0]).toBe(-1);
    expect(xColumns[1]).toBe(2);
    expect(xColumns[2]).toBe(-1);
    expect(xColumns[3]).toBe(-1);
    expect(oColumns[0]).toBe(-1);
    expect(oColumns[1]).toBe(-1);
    expect(oColumns[2]).toBe(-1);
    expect(oColumns[3]).toBe(1);
  });

  test("ratings of columns to be correct", () => {
    const xDiagonals = x.diagonals;
    const oDiagonals = o.diagonals;
    expect(xDiagonals[0]).toBe(-1);
    expect(xDiagonals[1]).toBe(3);
    expect(oDiagonals[0]).toBe(2);
    expect(oDiagonals[1]).toBe(-1);
  });
});
