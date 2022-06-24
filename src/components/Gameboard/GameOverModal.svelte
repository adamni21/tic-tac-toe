<script lang="ts">
  import { onDestroy } from "svelte";

  import Modal from "../UI/Modal.svelte";
  import Button from "../UI/Button.svelte";
  import { ticTacToe } from "../../stores/ticTacToe/gameStore";
  import type { TicTacToeStore } from "../../stores/ticTacToe/types";
  let isOpen = false;
  let game: TicTacToeStore;
  const unsubscribe = ticTacToe.subscribe((gameStore) => (game = gameStore));
  const startNewGameHandler = () => ticTacToe.startNewGame();

  $: isOpen = game.winner !== null;

  onDestroy(() => unsubscribe());
</script>

<Modal bind:isOpen>
  <div class="main rnd-corners">
    <h2 class="title">
      {#if game.winner === "_"}
        Draw
      {:else if game.singlePlayer}
        <span class={game.winner}>
          {#if game.winner === game.aiMark}
            You Lost
          {:else}
            You Won
          {/if}
        </span>
      {:else}
        <span class={game.winner}>
          {game.players[game.winner]}
        </span> has won.
      {/if}
    </h2>
    <Button on:click={startNewGameHandler}>Start new game</Button>
  </div>
</Modal>

<style>
  .main {
    text-align: center;
    height: fit-content;
    width: fit-content;
    padding: 2em 1em;
    background-color: var(--background);
  }
  .title {
    margin: 0;
    padding-bottom: 3rem;
  }
  .o {
    color: var(--primary);
  }
  .x {
    color: var(--secondary);
  }
</style>
