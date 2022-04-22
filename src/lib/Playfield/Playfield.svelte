<script lang="ts">
  // import type { FieldOwner, Player } from "./types";
  // import getSquareArray from "../../utils/getSquareArray";
  import { ticTacToeGame } from "../../utils/GameApi";

  import Field from "./Field.svelte";

  const PlayfieldSize = 3;

  const game = new ticTacToeGame(PlayfieldSize).startNewGame()

  let gameState = game.currentState

  const FieldClickHandler = ({ x, y }) => {
    if (game.processClick({x,y})) {
      gameState = game.currentState
    }
  };
</script>

<div
  style={`
  grid-template-columns: repeat(${PlayfieldSize}, 1fr);
  grid-template-rows: repeat(${PlayfieldSize}, 1fr);`}
>
  {#each gameState as row, rowIndex (rowIndex)}
    {#each row as column, colIndex (colIndex)}
      <Field
        coordinates={{ x: rowIndex, y: colIndex }}
        owner={column}
        onFieldClick={FieldClickHandler}
      />
    {/each}
  {/each}
</div>

<style>
  div {
    padding: 2rem;
    margin-top: 5rem;
    background-color: #011529;
    border-radius: 0.5rem;
    display: grid;
    gap: 6%;
    width: 65%;
    max-width: 400px;
    aspect-ratio: 1;
  }
</style>
