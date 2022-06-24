<script lang="ts">
  export let player1Name: string;
  export let player1Score: string | number;
  export let player2Name: string;
  export let player2Score: string | number;
</script>

<div class="main">
  <div class="names">
    <span class="player1">{player1Name}</span>
    <span class="player2">{player2Name}</span>
  </div>
  <div class="score">
    <span>{player1Score}</span>
    -
    <span>{player2Score}</span>
  </div>
</div>

<style>
  .main {
    padding-top: 1rem;
    width: 100%;
  }
  .names {
    display: flex;
    max-width: 100%;
    flex-wrap: wrap;
    padding: 0 1rem;
    font-size: 2rem;
  }
  .names > * {
    flex: 1;
    text-align: center;
  }
  .score {
    font-size: 5rem;
    display: flex;
    justify-content: center;
    gap: 2.5rem;
  }
  .player1 {
    color: var(--secondary);
  }
  .player2 {
    color: var(--primary);
  }
</style>
