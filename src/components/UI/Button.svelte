<script lang="ts">
  export let disabled = false;
  export let secondary = false;
  export let primary = !secondary;
  export let outlined = false;
</script>

<button
  class={$$props.class}
  class:primary
  class:secondary
  class:disabled
  class:outlined
  on:click
>
  <slot />
</button>

<style>
  button {
    border: 2px solid var(--primary);
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
  .primary:active {
    background-color: var(--primary);
  }
  .primary.outlined {
    color: var(--primary);
    background-color: var(--background);
    border: 2px solid var(--primary);
  }
  .primary.outlined:hover {
    color: var(--on-primary-colored);
    background-color: var(--primary-light);
  }
  .primary.outlined:active {
    background-color: var(--primary);
  }

  .secondary {
    color: var(--on-secondary);
    background-color: var(--secondary);
    border-color: var(--secondary);
  }
  .secondary:hover {
    color: var(--on-secondary);
    background-color: var(--secondary-light);
  }
  .secondary:active {
    background-color: var(--secondary);
  }
  .secondary.outlined {
    color: var(--secondary);
    background-color: var(--background);
    border: 2px solid var(--secondary);
  }
  .secondary.outlined:hover {
    color: var(--on-secondary-colored);
    background-color: var(--secondary-light);
  }
  .secondary.outlined:active {
    background-color: var(--secondary);
  }

  .disabled {
    filter: saturate(0.7) brightness(0.7);
  }
</style>
