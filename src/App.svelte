<script lang="ts">
  import { onDestroy } from "svelte";

  import Playfield from "./components/Playfield/Playfield.svelte";
  import { ticTacToe } from "./stores/ticTacToe/gameStore";
  import type { TicTacToeStore } from "./stores/ticTacToe/types";

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
  body {
    display: grid;
    justify-items: center;
  }

  :global(.rnd-corners) {
    border-radius: 15px;
  }

  :root {
    color: var(--on-background);
    background-color: var(--background);
    box-sizing: border-box;

    --background: #010e12;
    --on-background: #e4e2e6;
    --surface: #011529;
    --surface-variant: #002642;
    --on-surface: #e4e2e6;
    --primary: #eb9a0c;
    --primary-light: #ffb955;
    --primary-dark: #c98100;
    --on-primary: var(--background);
    --on-primary-colored: #2a1700;
    --secondary: #e7658e;
    --secondary-light: #ff84aa;
    --secondary-dark: #c74b74;
    --on-secondary: var(--background);
    --on-secondary-colored: #3f0019;
  }
</style>
