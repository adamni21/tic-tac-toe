import type { Coordinates, Ratings } from "../types";

const fieldsByRating = (
  rating: number,
  ratings: Ratings,
  freeFields: Coordinates[]
): Coordinates[] => {
  const valid = { rows: [], cols: [], diags: [] };
  // push indices of rows, cols, and diags with correct rating to valid
  ratings.rows.forEach((r, i) => {
    if (r === rating) valid.rows.push(i);
  });
  ratings.columns.forEach((r, i) => {
    if (r === rating) valid.cols.push(i);
  });
  ratings.diagonals.forEach((r, i) => {
    if (r === rating) valid.diags.push(i);
  });

  // required for checking whether coordinates are in diag[1]
  const lastCol = ratings.columns.length - 1;
  const validFields: Coordinates[] = [];
  // push all free fields that are in a valid row, col, or diag
  for (let i = 0; i < freeFields.length; i++) {
    const { row, col } = freeFields[i];
    if (valid.rows.includes(row)) {
      validFields.push({ row, col });
      continue;
    }
    if (valid.cols.includes(col)) {
      validFields.push({ row, col });
      continue;
    }
    // diag[0]
    if (row === col && valid.diags.includes(0)) {
      validFields.push({ row, col });
      continue;
    }
    // diag[1]
    if (row === col - lastCol && valid.diags.includes(1)) validFields.push({ row, col });
  }

  return validFields;
};

export default fieldsByRating;
