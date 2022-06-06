import { get, writable } from "svelte/store";
import type { GameSettings, UpdatedSettings } from "./types";

export const settingsInit: GameSettings = {
  size: 3,
  players: { x: "Player 1", o: "Player 2" },
  singlePlayer: true, // change to false when finish with computer oppenent
  aiMark: "o",
  startingPlayer: "x",
};

const createSettings = () => {
  const { update, subscribe } = writable(settingsInit);
  const updateSettings = (updated: UpdatedSettings) => {
    update((prev) => {
      if (updated.players)
        prev.players = { ...prev.players, ...updated.players };

      delete updated.players;
      return { ...prev, ...(updated as Partial<GameSettings>) };
    });
  };

  return { subscribe, updateSettings };
};

export const gameSettings = createSettings();
