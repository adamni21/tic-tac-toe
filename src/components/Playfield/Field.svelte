<script lang="ts">
  import { ticTacToe } from "../../stores/ticTacToe/gameStore";
import type { Coordinates } from "../../stores/ticTacToe/types";

  import CircleMark from "../marks/CircleMark.svelte";
  import XMark from "../marks/XMark.svelte";

  export let coordinates: Coordinates;
  export let owner = "";

  const clickHandler = () => {
    ticTacToe.processClick(coordinates);
  };
</script>

<div class:circle={owner === "o"} on:click={clickHandler}>
  {#if owner === "o"}
    <CircleMark />
  {:else if owner === "x"}
    <XMark />
  {/if}
</div>

<style>
  div {
    box-sizing: border-box;
    padding: 20%;
    background-color: var(--surface-variant);
    display: grid;
    align-items: center;
    justify-items: center;

    fill: var(--secondary);
  }
  .circle {
    fill: var(--primary);
  }
</style>
