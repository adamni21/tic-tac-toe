<script lang="ts">
  import { ticTacToe } from "../../stores/ticTacToe/gameStore";
  import type { Mark } from "../../stores/ticTacToe/types";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";

  export let settingsOpen;

  let startingPlayer: Mark = "x";

  const startGameHandler = () => {
    settingsOpen = false;
    ticTacToe.startNewGame();
  };
</script>

<Modal bind:isOpen={settingsOpen} onOverlayClick={null}>
  <div class="main rnd-corners">
    <div class="settings">
      <fieldset class="starting">
        <legend>Choose who shall begin</legend>
        <div>
          <label for="X">X</label>
          <input
            group={startingPlayer}
            type="radio"
            name="startingPlayer"
            id="X"
            value="x"
            checked
          />
        </div>
        <div>
          <label for="O">O</label>
          <input
            group={startingPlayer}
            type="radio"
            name="startingPlayer"
            id="O"
            value="o"
          />
        </div>
      </fieldset>
    </div>
    <div class="actions">
      <Button on:click={startGameHandler}>Start Game</Button>
    </div>
  </div>
</Modal>

<style>
  .main {
    text-align: center;
    height: fit-content;
    padding: 2em 1em;
    background-color: var(--background);
    display: grid;
    gap: 1rem;
    grid-template-rows: auto min-content;
    grid-template-areas:
      "settings"
      "actions";
  }

  .settings {
    grid-area: settings;
    margin-bottom: 2rem;
  }

  .starting {
    height: fit-content;
    padding: 0.5em auto;
    display: flex;
    justify-content: space-evenly;
  }

  .actions {
    grid-area: actions;
    display: flex;
    justify-content: flex-end;
  }
</style>
