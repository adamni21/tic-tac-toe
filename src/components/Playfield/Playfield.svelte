<script lang="ts">
  import Field from "./Field.svelte";
  import { ticTacToe } from "../../stores/ticTacToe";
  import type { TicTacToeStore } from "../../stores/types";
  import { onDestroy } from "svelte";
  import Settings from "./SettingsModal.svelte";
import SettingsModal from "./SettingsModal.svelte";

  let settingsOpen = true;

  let game: TicTacToeStore;

  const unsubscribe = ticTacToe.subscribe((gameStore) => (game = gameStore));

  onDestroy(unsubscribe);
</script>

<div
  style={`
  grid-template-columns: repeat(${game.size}, 1fr);
  grid-template-rows: repeat(${game.size}, 1fr);`}
>
  {#each game.currentState as row, rowIndex (rowIndex)}
    {#each row as column, colIndex (colIndex)}
      <Field coordinates={{ x: rowIndex, y: colIndex }} owner={column} />
    {/each}
  {/each}
  <SettingsModal bind:settingsOpen />
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
