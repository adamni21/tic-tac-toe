import type {
  AiDifficulty,
  Coordinates,
  FieldOwner,
  Mark,
  Ratings,
} from "../types";

export const aiMove = (
  currentState: FieldOwner[][],
  difficulty: AiDifficulty,
  aiMark: Mark,
  playersMark: Mark
): Coordinates => {
  // difficulty 0: random move
  if (difficulty === 0) return randomMove(currentState);

  const sideLength = currentState.length;
  const { ratings, freeFields } = rateStraights(currentState, aiMark);
  //difficulty 2: prevents opponent from completing straight if necessary, or else continues best own straight
  const needToPrevent = Math.max(...Object.values(ratings)) === sideLength - 1;
  if (difficulty === 2 && needToPrevent) {
    const prevent = preventCompletion(currentState, playersMark);
    if (prevent) return prevent;
    // if prevent === null continue with best straight
  }
  // difficulty 1: continue best straight
  // difficulty 1 and continuation of difficulty 2
  return bestStraight(ratings, freeFields, currentState.length);
};

export function randomMove(currentState: FieldOwner[][]): Coordinates {
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

/* finds the straight (row/column/diagonal) with most own marks and without any opponent mark if there is one,
    else returns random free field */
function bestStraight(
  ratings: Ratings,
  freeFields: Coordinates[],
  sideLength: number
): Coordinates {
  const { rows, columns, diagonals } = ratings;

  // gather all straights with highestRating
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
    return freeFields[Math.floor(Math.random() * freeFields.length)];

  let randomPick = Math.floor(
    Math.random() * Object.values(options).flat().length
  );
  let validFields: Coordinates[];

  /* apply randomPick. e.g.  "{ rows: [1, 3], cols: [0], diags: [0] }"
     randomPick is in [0, 1]: pick row;   rP === 2: pick col;   rP === 3: pick diag;*/
  // randomPick was in range of the row options.
  if (randomPick < options.rows.length)
    validFields = freeFields.filter(
      ({ row }) => row === options.rows[randomPick]
    );
  // randomPick was in range of the columns options
  else if (randomPick - options.rows.length < options.columns.length) {
    // subract lenght of options.rows to get correct index for options.columns
    randomPick -= options.rows.length;
    validFields = freeFields.filter(
      ({ col }) => col === options.columns[randomPick]
    );
  } else {
    // subract lenght of options.rows and options.columns to get correct index for options.diagonals
    randomPick -= options.rows.length + options.columns.length;
    // diagonal[0] was chosen
    if (options.diagonals[randomPick] === 0)
      validFields = freeFields.filter(({ row, col }) => row === col);
    // diagonal[1] was chosen
    else {
      const lastIndex = sideLength - 1;
      validFields = freeFields.filter(
        ({ row, col }) => row === lastIndex - col
      );
    }
  }

  return validFields[Math.floor(Math.random() * validFields.length)];
}

/* prevent opponent from completing a row, column or diagonal with only one missing field.
   returns null, if there is no opportunity for the opponent, to complete a straight. 
   or else, the coordinates of the missing field. (if there are multiple, one is chosen randomly) */
function preventCompletion(
  currentState: FieldOwner[][],
  opponentMark: Mark
): Coordinates | null {
  const sideLength = currentState.length;
  const { ratings, freeFields } = rateStraights(currentState, opponentMark);

  // opponent has no oppoturnity to complete a straight in one move
  if (Math.max(...Object.values(ratings).flat()) !== sideLength - 1)
    return null;
  // best straight of opponent
  else return bestStraight(ratings, freeFields, sideLength);
}

/* rates all straights (rows/columns/diagonals) and returns ratings and array of free fields
   rating = if (straight contains other mark): -1; else: 1 * ownMark */
function rateStraights(
  currentState: FieldOwner[][],
  mark: Mark
): {
  ratings: Ratings;
  freeFields: Coordinates[];
} {
  const sideLength = currentState.length;
  const lastIndex = sideLength - 1;

  const rows = new Array(sideLength).fill(0);
  const columns = new Array(sideLength).fill(0);
  const diagonals = [0, 0];
  let freeFields: Array<Coordinates> = [];
  // rate all straights (while logging free fields to freeFields)
  for (let row = 0; row < sideLength; row++) {
    for (let col = 0; col < sideLength; col++) {
      // update rating of respective row, column and diagonal/s of current field according to mark/owner
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
          freeFields.push({ row, col });
          break;
        default: // opponents mark
          rows[row] = -1;
          columns[col] = -1;
          if (row === col) diagonals[0] = -1;
          if (row === lastIndex - col) diagonals[1] = -1;
      }
    }
  }
  return { ratings: { rows, columns, diagonals }, freeFields };
}
