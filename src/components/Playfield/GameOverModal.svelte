<script lang="ts">
  import { ticTacToe } from "../../stores/ticTacToe";
  import { onDestroy } from "svelte";

  import Modal from "../UI/Modal.svelte";
  let isOpen = false;
  let game;
  const unsubscribe = ticTacToe.subscribe((gameStore) => (game = gameStore));
  const startNewGameHandler = () => ticTacToe.startNewGame("x");

  $: isOpen = game.winner !== null;

  onDestroy(() => unsubscribe());
</script>

<Modal bind:isOpen>
  <div class="main rnd-corners">
    <h2 class="title">{game.winner === "" ? "Draw" : `Player ${game.winner} has won`}</h2>
    <button on:click={startNewGameHandler}>Start new game</button>
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
</style>
