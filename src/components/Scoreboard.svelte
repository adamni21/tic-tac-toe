<script lang="ts">
  export let player1Name: string;
  export let player1Score: string | number;
  export let player2Name: string;
  export let player2Score: string | number;
</script>

<div class="main">
  <div class="left details">
    <div class="player1">{player1Name}</div>
    <div class="score">{player1Score}</div>
  </div>
  <!-- <div class="score"> - </div> -->
  <div class="right details">
    <div class="player2">{player2Name}</div>
    <div class="score">{player2Score}</div>
  </div>
</div>

<style>
  .main {
    padding-top: 1rem;
    width: 100%;
    font-size: 2rem;
    display: flex;
    column-gap: 10%;
    justify-content: center;
    align-items: center;
  }
  /* .right {
    align-items: flex-end;
  }
  .left {
    align-items: flex-start;
  } */
  .details {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    max-width: 45%;
  }
  .score {
    font-size: 5rem;
  }
  .player1 {
    color: var(--secondary);
  }
  .player2 {
    color: var(--primary);
  }
</style>
