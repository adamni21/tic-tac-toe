<script lang="ts">
  import { onDestroy } from "svelte";

  import Playfield from "./components/Playfield/Playfield.svelte";
  import type { FieldOwner } from "./components/Playfield/types";
  import { ticTacToe } from "./stores/ticTacToe";

  let winner: FieldOwner;
  const unsubscribe = ticTacToe.subscribe(
    (gameStore) => (winner = gameStore.winner)
  );
  onDestroy(unsubscribe);
</script>

<body>
  <h2>
    {#if winner === null}
      No winner yet
    {:else if winner !== ""}
      Player {winner} has won
    {:else}
      Draw
    {/if}
  </h2>
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
