<script lang="ts">
  import { ticTacToe } from "../../stores/ticTacToe/gameStore";
  import { gameSettings } from "../../stores/ticTacToe/settingsStore";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";

  export let settingsOpen;

  const changeHandler = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.type === "checkbox")
      gameSettings.updateSettings({ singlePlayer: target.checked });
    else if (target.name === "players")
      gameSettings.updateSettings({ players:{ [target.id]: target.value} });
    else gameSettings.updateSettings({ [target.name]: target.value });
  };

  const startGameHandler = () => {
    settingsOpen = false;
    ticTacToe.startNewGame();
  };
</script>

<Modal bind:isOpen={settingsOpen} onOverlayClick={null}>
  <div class="main rnd-corners">
    <form class="settings" on:change={changeHandler}>
      <div>
        <input
          type="checkbox"
          name="singlePlayer"
          id="singlePlayer"
          checked={$gameSettings.singlePlayer}
        />
        <label for="singleplayer">Single Player</label>
      </div>
      <div class="names">
        <div>
          <label for="x">Player X Name</label>
          <input type="text" name="players" id="x" placeholder="Player X" />
        </div>
        <div class:disabled={$gameSettings.singlePlayer}>
          <label for="o">Player O Name</label>
          <input
            type="text"
            name="players"
            id="o"
            placeholder="Player 2"
            disabled={$gameSettings.singlePlayer}
          />
        </div>
        <fieldset class="starting">
          <legend>Choose who shall begin</legend>
          <div>
            <label for="X">X</label>
            <input
              type="radio"
              name="startingPlayer"
              id="X"
              value="x"
              checked
            />
          </div>
          <div>
            <label for="O">O</label>
            <input type="radio" name="startingPlayer" id="O" value="o" />
          </div>
        </fieldset>
      </div>
    </form>
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
  .settings > div {
    padding: 0.5rem;
  }

  input {
    background-color: var(--surface);
    padding: 0.2em;
    color: var(--on-surface);
    border: solid var(--surface-variant) 2px;
    border-radius: 5px;
    accent-color: var(--primary);
  }

  .disabled {
    filter: saturate(0.7) brightness(0.7);
  }

  .names {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
