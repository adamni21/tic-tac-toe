<script lang="ts">
  import type { FieldOwner, Player } from "./types";
  import getSquareArray from "../../utils/getSquareArray";

  import Field from "./Field.svelte";

  const PlayfieldSize = 3;

  let GameState: FieldOwner[][] = getSquareArray(PlayfieldSize, "");
  let currentPlayer: Player = "o";

  const setOwnerHandler = ({ x, y }) => {
    GameState[x][y] = currentPlayer;
    GameState = GameState;
    currentPlayer = currentPlayer === "o" ? "x" : "o";
  };
</script>

<div
  style={`
  grid-template-columns: repeat(${PlayfieldSize}, 1fr);
  grid-template-rows: repeat(${PlayfieldSize}, 1fr);`}
>
  {#each GameState as row, rowIndex (rowIndex)}
    {#each row as column, colIndex (colIndex)}
      <Field
        coordinates={{ x: rowIndex, y: colIndex }}
        owner={column}
        setOwner={setOwnerHandler}
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
