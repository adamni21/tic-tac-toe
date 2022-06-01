<script lang="ts">
  import Field from "./Field.svelte";
  import { onDestroy } from "svelte";
  import SettingsModal from "./SettingsModal.svelte";
  import GameOverModal from "./GameOverModal.svelte";
  import type { TicTacToeStore } from "../../stores/ticTacToe/types";
  import { ticTacToe } from "../../stores/ticTacToe/gameStore";

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
  <GameOverModal />
</div>

<style>
  div {
    padding: 2rem;
    margin-top: 5rem;
    background-color: var(--surface);
    border-radius: 0.5rem;
    display: grid;
    gap: 6%;
    width: 65%;
    max-width: 400px;
    aspect-ratio: 1;
  }
</style>
