import type { AiDifficulty, Coordinates, FieldOwner, Mark } from "./types";

type HasWinner = (currentState: FieldOwner[][]) => FieldOwner | null;

export const hasWinner: HasWinner = (currentState) => {
  const size = currentState.length;
  let winner: FieldOwner = "_";

  const columnOwners = [...currentState[0]];
  const lastIndex = size - 1;
  const diagonalOwners: FieldOwner[] = [
    currentState[0][0],
    currentState[0][lastIndex],
  ];

  currentState.forEach((row, colInd) => {
    let RowOwner: FieldOwner = row[0];

    for (let i = 0; i < size; i++) {
      // set row to unconquered i.e. '"_"' if the mark of the current field is different from the previous fields
      if (RowOwner !== "_" && RowOwner !== row[i]) RowOwner = "_";
      // set column to unconquered i.e. '"_"' if the mark of the current field is different from the previous fields
      if (columnOwners[i] !== "_" && columnOwners[i] !== row[i])
        columnOwners[i] = "_";
    }

    // set diagonal one to unconquered i.e. '"_"' if the mark of the current field is different from the previous fields
    if (diagonalOwners[0] !== row[colInd]) diagonalOwners[0] = "_";
    // set diagonal two to unconquered i.e. '"_"' if the mark of the current field is different from the previous fields
    if (diagonalOwners[1] !== row[lastIndex - colInd]) diagonalOwners[1] = "_";
    if (RowOwner !== "_") {
      winner = RowOwner;
      return winner;
    }
  });

  // checking for uniform column
  columnOwners.forEach((owner) => {
    if (owner !== "_") winner = owner;
  });
  // checking for uniform diagonal
  diagonalOwners.forEach((owner) => {
    if (owner !== "_") winner = owner;
  });

  return winner === "_" ? null : winner;
};

type aiMove = (
  currentState: FieldOwner[][],
  difficulty: AiDifficulty,
  aiMark: Mark
) => Coordinates;

export const aiMove = (currentState, difficulty, aiMark) => {
  return fullestStraight(currentState, aiMark);
};

function randomMove(currentState: FieldOwner[][]): Coordinates {
  const sideLength = currentState.length;
  let row = Math.floor(Math.random() * sideLength);
  let col = Math.floor(Math.random() * sideLength);
  // find next free field from random initial coordinates defined above
  while (currentState[row][col] !== "_") {
    if (row === 2) col = (col + 1) % sideLength;
    row = (row + 1) % sideLength;
  }
  return { row, col };
}
// find row, column or diagonal with most fields of own mark and without any opponent mark
function fullestStraight(
  currentState: FieldOwner[][],
  mark: Mark
): Coordinates {
  const sideLength = currentState.length;
  const lastIndex = sideLength - 1;
  let validFields: Array<Coordinates> = [];

  // rate all rows, columns and diagonals (while logging free fields to validFields)
  const rows = new Array(sideLength).fill(0);
  const columns = new Array(sideLength).fill(0);
  const diagonals = [0, 0];
  // rate all rows, columns and diagonals
  for (let row = 0; row < sideLength; row++) {
    for (let col = 0; col < sideLength; col++) {
      // update rating of respective row, column and diagonal/s of current field accordin to owner
      switch (currentState[row][col]) {
        case mark:
          if (rows[row] !== -1) rows[row]++;
          if (columns[col] !== -1) columns[col]++;
          // diagonal 0
          if (row === col && diagonals[0] !== -1) diagonals[0]++;
          // diagonal 1
          if (row === lastIndex - col && diagonals[1] !== -1) diagonals[1]++;
          break;
        case "_":
          validFields.push({ row, col });
          break;
        default: // opponents mark
          rows[row] = -1;
          columns[col] = -1;
          if (row === col) diagonals[0] = -1;
          if (row === lastIndex - col) diagonals[1] = -1;
      }
    }
  }

  // gather all rows, columns and diagonals with highestRating
  let highestRating = 0;
  let options = { rows: [], columns: [], diagonals: [] };
  // pushing row/column indices of rows/columns with highestRating to options
  for (let i = 0; i < sideLength; i++) {
    if (rows[i] > highestRating || columns[i] > highestRating) {
      highestRating = Math.max(rows[i], columns[i]);
      // delete all options of previous lower highestRating
      options = { rows: [], columns: [], diagonals: [] };
    }
    if (rows[i] === highestRating) options.rows.push(i);
    if (columns[i] === highestRating) options.columns.push(i);
  }
  // pushing diagonals indices of diagonals with highestRating to options
  for (let i = 0; i < 2; i++) {
    if (diagonals[i] > highestRating) {
      highestRating = diagonals[i];
      // delete all options of previous lower highestRating
      options = { rows: [], columns: [], diagonals: [] };
    }
    if (diagonals[i] === highestRating) options.diagonals.push(i);
  }

  // pick random free field to possibly obstruct the oppenent since there are no straights to complete/continue
  if (highestRating < 1)
    return validFields[Math.floor(Math.random() * validFields.length)];

  let randomPick = Math.floor(
    Math.random() * Object.values(options).flat().length
  );

  // apply randomPick
  if (randomPick < options.rows.length)
    validFields = validFields.filter(
      ({ row }) => row === options.rows[randomPick]
    );
  else if (randomPick - options.rows.length < options.columns.length) {
    // subract lenght of options.rows to get correct index for options.columns
    randomPick -= options.rows.length;
    validFields = validFields.filter(
      ({ col }) => col === options.columns[randomPick]
    );
  } else {
    // subract lenght of options.rows and options.columns to get correct index for options.diagonals
    randomPick -= options.rows.length + options.columns.length;
    if (options.diagonals[randomPick] === 0)
      validFields = validFields.filter(({ row, col }) => row === col);
    else
      validFields = validFields.filter(
        ({ row, col }) => row === lastIndex - col
      );
  }

  return validFields[Math.floor(Math.random() * validFields.length)];
}
