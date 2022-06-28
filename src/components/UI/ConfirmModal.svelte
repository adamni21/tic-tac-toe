<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "./Button.svelte";
  import Modal from "./Modal.svelte";

  export let isOpen: boolean;

  const dispatch = createEventDispatcher();

  const confirmHandler = () => dispatch("confirm");
  const cancelHandler = () => dispatch("cancel");
</script>

<Modal {isOpen}>
  <div class="main rnd-corners">
    <div class="message">
     <p><slot name="message" /></p>
    </div>
    <div class="actions">
      <Button class="action-btn" on:click={cancelHandler} outlined>
        <slot name="cancelButtonInner">Cancel</slot>
      </Button>
      <Button class="action-btn" on:click={confirmHandler}>
        <slot name="confirmButtonInner">Confirm</slot>
      </Button>
    </div>
  </div>
</Modal>

<style>
  .main {
    text-align: center;
    height: fit-content;
    padding: 1.5rem 1rem 1rem;
    background-color: var(--background);
    display: grid;
    gap: 1rem;
    grid-template-rows: auto min-content;
    grid-template-areas:
      "message"
      "actions";
  }
  .message {
    grid-area: message;
    font-size: 1.2rem;
  }
  .message > p {
    margin: 0;
    padding: 0 .5em;
  }
  .actions {
    grid-area: actions;
    justify-self: end;
  }
  .main :global(.action-btn) {
    padding: .3rem .5rem;
    border-radius: 99999px;
  }
</style>
