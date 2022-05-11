<script lang="ts">
  import type { Coordinates, FieldOwner } from "./types";
  import Field from "./Field.svelte";
  import { ticTacToe } from "../../stores/ticTacToe";
  export let PlayfieldSize: number;
  export let gameState: FieldOwner[][];
  export let onFieldClick: (coordinates: Coordinates) => void;
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
        {onFieldClick}
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
