<script lang="ts">

  export let isOpen = false;
  export let className = "";
</script>

{#if isOpen}
  <div class={"overlay " + className} on:click>
    <slot />
  </div>
{/if}

<style>
  .overlay {
    background-color: #333c;
    z-index: 50;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
  }
</style>
