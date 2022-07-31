# Tic Tac Toe 

built with Svelte + TS + Vite

Try it at: https://creative-hummingbird-c9b8e6.netlify.app/

### To run it locally

1. Download or git clone repository
2. run `npm i`
3. when all packages are install run `npm run dev` to start dev server

## Functionality

It is possible to play either multiplayer ("offline" on the same machine) or single player (against an [ai opponent](#ai-opponent)), and only single games (no scoreboard).

## Ai Opponent

The Ai has three levels of difficulty.

The levels are:

1. Picks random free field.

2. Continues best straight (row, column, or diagonal) that has the most own marks (x | o) and has no opponent marks.

3. Completes straight if only one field is missing, else if opponent lacks only one field to win block it (cannot prevent binds), or else continues best straight.
