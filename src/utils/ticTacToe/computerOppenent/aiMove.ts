import getFreeFields from "../getFreeFields";
import type { AiDifficulty, BoardState, Coordinates, Mark } from "../types";
import fieldsByRating from "./fieldsByRating";
import rateStraights from "./rateStraights";

// returns all valid coordinates for current board and difficulty
const aiMove = (
  state: BoardState,
  difficulty: AiDifficulty,
  ownMark: Mark,
  opponentsMark: Mark
): Coordinates[] => {
  const freeFields = getFreeFields(state);
  // random move
  if (difficulty === "0") return freeFields;

  const ownRatings = rateStraights(state, ownMark);
  const highestOwn = Math.max(...Object.values(ownRatings).flat());
  const bestOwnFields = fieldsByRating(highestOwn, ownRatings, freeFields);
  // continues best own straight
  if (difficulty === "1") return bestOwnFields;

  if (difficulty === "2") {
    const side = state.length; // side length of board
    // can win in one move
    if (highestOwn === side - 1) return bestOwnFields;

    const oppRating = rateStraights(state, opponentsMark);
    const highestOpp = Math.max(...Object.values(oppRating).flat());
    // opponent can win in one move. prevent opponent from winning
    if (highestOpp === side - 1)
      return fieldsByRating(highestOpp, oppRating, freeFields);

    // neither of the above. continue best own straight
    return bestOwnFields;
  }
};
export default aiMove;
