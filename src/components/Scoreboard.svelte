<script lang="ts">
  export let player1Name: string;
  export let player1Score: string | number;
  export let player2Name: string;
  export let player2Score: string | number;
</script>

<div class="scoreboard">
  <div class="player1" class:smaller={player1Name.length > 14}>
    {player1Name}
  </div>
  <div class="player2" class:smaller={player2Name.length > 14}>
    {player2Name}
  </div>
  <div class="score">{player1Score}</div>
  <div class="score">{player2Score}</div>
</div>

<style>
  .scoreboard {
    padding-top: 1rem;
    width: 100%;
    font-size: 2rem;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(2, 45%);
    justify-items: center;
    align-items: center;
    column-gap: 10%;
  }
  .score {
    font-size: 5rem;
  }
  .smaller {
    font-size: 1.5rem;
  }
  .player1,
  .player2 {
    word-break: break-word;
  }
  .player1 {
    color: var(--secondary);
  }
  .player2 {
    color: var(--primary);
  }
</style>
