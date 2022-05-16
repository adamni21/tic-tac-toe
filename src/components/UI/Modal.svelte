<script lang="ts">
  import Overlay from "./Overlay.svelte";

  export let isOpen = false;
  export let closeOnOverlayClick = true;

  const close = (condition = true) => {
    if (condition) isOpen = false;
  };
</script>

{#if isOpen}
  <Overlay isOpen on:click={() => close(closeOnOverlayClick)}>
    <slot close/>
  </Overlay>
{/if}
