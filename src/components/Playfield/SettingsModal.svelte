<script lang="ts">
  import { ticTacToe } from "../../stores/ticTacToe";
  import Modal from "../UI/Modal.svelte";
  import type { Player } from "./types";

  export let settingsOpen;

  let startingPlayer: Player = "x";

  const startGameHandler = () => {
    settingsOpen = false;
    ticTacToe.startNewGame(startingPlayer);
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
            bind:group={startingPlayer}
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
            bind:group={startingPlayer}
            type="radio"
            name="startingPlayer"
            id="O"
            value="o"
          />
        </div>
      </fieldset>
    </div>
    <div class="actions">
      <button class="startGame" on:click={startGameHandler}>Start Game</button>
    </div>
  </div>
</Modal>

<style>
  .main {
    height: fit-content;
    padding: 2em 1em;
    background-color: #02040f;
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

  .startGame {
    margin-left: 0.8rem;
  }
</style>
