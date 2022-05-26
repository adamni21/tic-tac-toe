<script lang="ts">
  import type { Coloring } from "./types";

  export let coloring: Coloring = "primary";
  export let outlined = false;
</script>

<button class={`${coloring} ${$$props.class}`} class:outlined on:click>
  <slot />
</button>

<style>
  button {
    border: none;
    border-radius: 0.8em;
    padding: 0.5rem;
  }

  .primary {
    color: var(--on-primary);
    background-color: var(--primary);
  }
  .primary:hover {
    background-color: var(--primary-light);
  }
  .primary.outlined {
    color: var(--primary);
    background-color: var(--background);
    border: 2px solid var(--primary);
  }
  .primary.outlined:hover {
    color: var(--background);
    background-color: var(--primary);
  }
  
  .secondary {
    color: var(--on-secondary);
    background-color: var(--secondary);
  }
  .secondary:hover {
    color: var(--on-secondary);
    background-color: var(--secondary-light);
  }
  .secondary.outlined {
    color: var(--secondary);
    background-color: var(--background);
    border: 2px solid var(--secondary);
  }
  .secondary.outlined:hover {
    color: var(--background);
    background-color: var(--secondary);
  }
</style>
