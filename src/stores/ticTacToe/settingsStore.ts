import { writable } from "svelte/store"
import type { GameSettings } from "./types"

export const settingsInit: GameSettings = {
  size: 3,
  players: new Map([["x", "Player 1"], ["o", "Player 2"]]),
  singlePlayer: true, // change to false
  aiMark: "o",
  startingPlayer: "x",
}



const createSettings = () => {
  const {update, subscribe} = writable(settingsInit)

  return { subscribe }
}

export const gameSettings = createSettings()