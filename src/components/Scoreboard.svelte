<script lang="ts">
  export let player1Name: string;
  export let player1Score: string | number;
  export let player2Name: string;
  export let player2Score: string | number;
</script>

<div class="main">
  <div class="details player1">
    <span class="name">{player1Name}</span>
    <span class="score">{player1Score}</span>
  </div>
  <div class="details player2">
    <span class="name">{player2Name}</span>
    <span class="score">{player2Score}</span>
  </div>
</div>

<style>
  .main {
    padding-top: 1rem;
    width: 100%;
    max-width: 450px;
    display: flex;
    justify-content: space-between;
    column-gap: 4rem;
  }
  .details {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .name {
    font-size: 2rem;
  }
  .score {
    font-size: 5rem;
  }
  .player1 .name {
    color: var(--secondary);
  }
  .player2 .name {
    color: var(--primary);
  }
</style>
