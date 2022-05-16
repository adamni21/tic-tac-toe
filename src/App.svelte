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
    background-color: #02040f;
  }
  body {
    display: grid;
    justify-items: center;
  }
  h2 {
    color: blanchedalmond;
  }
</style>
