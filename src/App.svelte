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
  {#if game.winner === null && game.running}
    <h2>
      Player {game.currentPlayer}'s turn
    </h2>
  {/if}
  <Playfield />
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
