# Tic Tac Toe 

built with Svelte + TS + Vite

### To Start It

1. Download or git clone repository
2. run `npm i`
3. when all packages are install run `npm run dev` to start dev server

## Functionality

It is possible to play either multiplayer ("offline" on the same machine) or single player (against an [ai opponent](#ai-opponent)), and only single games (no scoreboard).

## Ai Opponent

The Ai has three levels of difficulty (not yet configurable through the GUI).

The levels are:

1. Picks random free field.

2. Continues best straight (row, column, or diagonal) that has the most own marks (x | o) and has no opponent marks.

3. Completes straight if only one field is missing, else if opponent lacks only one field to win block it (cannot prevent binds), or else continues best straight.

To change ai difficulty go to "./src/stores/ticTacToe/gameStore.ts -> `createTicTacToe` -> `triggerAiMove` (ln: 55) -> `aiMove(...)` (ln: 58).

## In Work

- Code testing
- 4th Ai difficulty (unbeatable)
- Scoreboard
- Making ai difficulty configurable from GUI
- Perhaps making playfield size configurable from GUI
