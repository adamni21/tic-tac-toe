<script lang="ts">
  import { onDestroy } from "svelte";
  import Gameboard from "./components/Gameboard/Gameboard.svelte";
  import Scoreboard from "./components/Scoreboard.svelte";

  import { ticTacToe } from "./stores/ticTacToe/gameStore";
  import { gameSettings } from "./stores/ticTacToe/settingsStore";
  import type { TicTacToeStore } from "./stores/ticTacToe/types";

  let game: TicTacToeStore;
  const unsubscribe = ticTacToe.subscribe((gameStore) => (game = gameStore));

  onDestroy(unsubscribe);
</script>

<body>
  <main>
    <Scoreboard
      player1Name={$gameSettings.players.x}
      player1Score={game.score.x}
      player2Name={$gameSettings.singlePlayer
        ? "Computer"
        : $gameSettings.players.o}
      player2Score={game.score.o}
    />
    <Gameboard />
  </main>
</body>

<style>
  :global(.rnd-corners) {
    border-radius: 15px;
  }
  main {
    margin: 0 auto;
    width: 90%;
    min-width: 350px;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
