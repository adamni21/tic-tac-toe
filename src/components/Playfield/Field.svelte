<script lang="ts">
  import CircleMark from "../marks/CircleMark.svelte";
  import XMark from "../marks/XMark.svelte";

  import { ticTacToe } from "../../stores/ticTacToe";

  export let coordinates: { x: number; y: number };
  export let owner = "";

  $: fontColor = owner === "o" ? "#E59500" : "#D65780";

  const clickHandler = () => {
    ticTacToe.processClick(coordinates);
  };
</script>

<div on:click={clickHandler} style={`color: ${fontColor};`}>
  {#if owner === "o"}
    <CircleMark color={fontColor} />
  {:else if owner === "x"}
    <XMark color={fontColor} />
  {/if}
</div>

<style>
  div {
    box-sizing: border-box;
    padding: 20%;
    background-color: #002642;
    font-weight: 900;
    font-size: 2rem;
    display: grid;
    align-items: center;
    justify-items: center;
  }
</style>
