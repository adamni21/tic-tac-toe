<script lang="ts">
  import Overlay from "./Overlay.svelte";

  export let isOpen = false;
  export let onOverlayClick: (() => any) | null | true = true;
  ;

  const close = (condition = true) => {
    if (condition) isOpen = false;
  };
  const overlayClickHandler = () => {
    if(!onOverlayClick) return
    if(onOverlayClick === true) close()
    else onOverlayClick()
  }
</script>

{#if isOpen}
  <Overlay isOpen on:click={overlayClickHandler}>
    <slot />
  </Overlay>
{/if}
