<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  export let min: string;
  export let max: string;
  export let value: string | number = min;
  export let disabled = false;
  export let secondary = false;
  export let primary = !secondary;

  $: minN = Number(min);
  $: maxN = Number(max);
  $: valueN = Number(value);

  $: range = maxN - minN;

  const dispatch = createEventDispatcher();
  let slider: HTMLElement | null;
  let base: HTMLElement | null;
  let baseWidth: number;

  let sliderOffset: number;
  let sliderWidth: number;
  let isMousedown = false;

  $: dispatch("change", { value });

  $: sliderWidth = (((baseWidth / range) * (valueN - minN)) / baseWidth) * 100;

  $: {
    if (valueN < minN) throw new Error('value must not be smaller than "min"');
    if (valueN > maxN) throw new Error('value must not be greater than "max"');
  }

  onMount(() => {
    baseWidth = base.getBoundingClientRect().width;
  });

  const updatePos = (cursorPos) => {
    // cursor position relative to slider start
    const rltvPos = cursorPos - sliderOffset;
    // cut relative position to be not negative and not greater than width of base/track
    const cut = Math.max(Math.min(baseWidth, rltvPos), 0);
    const nearest = Math.round(cut / (baseWidth / range));
    valueN = nearest + minN;
  };
  const handleMousedown = (e) => {
    if (disabled) return;
    sliderOffset = slider.getBoundingClientRect().x;
    baseWidth = base.getBoundingClientRect().width;
    updatePos(e.clientX);
    isMousedown = true;
  };
  const handleMousemove = (e) => {
    sliderOffset = slider.getBoundingClientRect().x;
    baseWidth = base.getBoundingClientRect().width;
    if (isMousedown) updatePos(e.clientX);
  };
  const resetMousedown = () => {
    isMousedown = false;
    if (String(valueN) !== value) value = String(valueN);
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
  <div bind:this={base} class={"slider-base"}>
    <div bind:this={slider} class="slider" style={`width: ${sliderWidth}%;`}>
      <div class="thumb" />
    </div>
  </div>
</div>

<style>
  .secondary {
    --color: var(--secondary);
  }

  .primary {
    --color: var(--primary);
  }

  .con {
    box-sizing: border-box;
    padding: 0.8rem 1.5rem;
    width: auto;
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
