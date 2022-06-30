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

  $: if (game.singlePlayer && game.currentPlayer === game.aiMark)
    ticTacToe.triggerAiMove();

  onDestroy(unsubscribe);
</script>

<div class="outer-bounds">
  <div
    class="inner-bounds"
    style={`
  grid-template-columns: repeat(${game.size}, 1fr);
  grid-template-rows: repeat(${game.size}, 1fr);`}
  >
    {#each game.currentBoard as row, rowIndex (rowIndex)}
      {#each row as column, colIndex (colIndex)}
        <Field coordinates={{ row: rowIndex, col: colIndex }} owner={column} />
      {/each}
    {/each}
  </div>
  <SettingsModal bind:settingsOpen />
  <GameOverModal openSettings={() => (settingsOpen = true)} />
</div>

<style>
  .outer-bounds {
    margin-top: 2rem;
    background-color: var(--surface);
    border-radius: 0.5rem;
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inner-bounds {
    display: grid;
    gap: 6%;
    width: 85%;
    height: 85%;
  }
</style>
