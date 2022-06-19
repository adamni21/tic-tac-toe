<script lang="ts">
  import { onMount } from "svelte";
  export let value: number;
  export let min: number;
  export let max: number;
  export let primary = false;
  export let secondary = false;

  let slider: HTMLElement | null;
  let baseWidth: number;

  let sOff: number;
  let pos: number;
  let isMousedown = false;

  onMount(() => {
    sOff = slider.getBoundingClientRect().x;
    pos = (baseWidth / (max - min)) * value;
  });
  const updatePos = (cursorPos) => {
    // cursor position relative to slider start
    const rltvPos = cursorPos - sOff + window.scrollX;
    // cut relative position to width of base/track
    const cut = Math.max(Math.min(baseWidth, rltvPos), 0);
    const nearest = Math.round(cut / (baseWidth / (max - min)));
    value = nearest;
    pos = (baseWidth / (max - min)) * value;
  };
  const handleMousedown = (e) => {
    updatePos(e.clientX);
    isMousedown = true;
  };
  const handleMousemove = (e) => {
    if (isMousedown) updatePos(e.clientX);
  };
  const resetMousedown = () => {
    isMousedown = false;
  };
</script>

<div
  class="con"
  class:primary
  class:secondary
  on:mousemove={handleMousemove}
  on:mousedown={handleMousedown}
  on:mouseup={resetMousedown}
  on:mouseleave|self={resetMousedown}
>
  <div bind:clientWidth={baseWidth} class={"slider-base"}>
    <div bind:this={slider} class="slider" style={`width: ${pos}px;`}>
      <div class="thumb" />
    </div>
  </div>
</div>

<style>
  .primary {
    --color: var(--primary);
  }
  .secondary {
    --color: var(--secondary);
  }
  .con {
    box-sizing: border-box;
    padding: 0.8rem 1.5rem;
    width: 100%;
    background-color: none;
  }
  .slider-base {
    background-color: var(--surface-variant);
    height: 0.6rem;
    width: 100%;
    border-radius: 0.3rem;
  }
  .slider {
    height: 100%;
    background-color: var(--color);
    border-radius: 0.3rem;
    position: relative;
  }
  .thumb {
    height: 180%;
    aspect-ratio: 1;
    border-radius: 99999px;
    background-color: var(--color);
    box-shadow: -1px 0 2px #0002;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
  }
</style>
