<script lang="ts">
  import { onDestroy } from "svelte";

  import Playfield from "./components/Playfield/Playfield.svelte";
  import { ticTacToe } from "./stores/ticTacToe";
  import type { TicTacToeStore } from "./stores/types";

  let game: TicTacToeStore;
  const unsubscribe = ticTacToe.subscribe((gameStore) => (game = gameStore));
  onDestroy(unsubscribe);
</script>

<body>
  <h2>
    {#if game.winner !== undefined && game.winner !== ""}
      Player {game.winner} has won
    {:else}
      "No winner yet"
    {/if}
  </h2>
  <Playfield />
  <button on:click={() => ticTacToe.startNewGame()}>start</button>
</body>

<style>
  :root {
    color: blanchedalmond;
    background-color: #02040f;
    box-sizing: border-box;
  }
  body {
    display: grid;
    justify-items: center;
  }

  :global(.rnd-corners) {
    border-radius: 15px;
  }
</style>
