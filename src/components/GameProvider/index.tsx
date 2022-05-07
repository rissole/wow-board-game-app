import React, { createContext, ReactNode, useState } from "react";

import { CharacterLevel, Faction, HeroClass } from "../../types";

export interface CharacterState {
  heroClass: HeroClass;
  faction: Faction;
  level: CharacterLevel;
  health: number;
  energy: number;
  gold: number;
}

export type GameContextType = {
  character: CharacterState;
  updateCharacter: (update: Partial<CharacterState>) => void;
};

const DEFAULT_CHARACTER_STATE: CharacterState = {
  heroClass: "priest",
  faction: "horde",
  level: 1,
  health: 0,
  energy: 0,
  gold: 0,
};

const DEFAULT_GAME_STATE = {
  character: DEFAULT_CHARACTER_STATE,
  updateCharacter: () => {},
};

export const GameContext = createContext<GameContextType>(DEFAULT_GAME_STATE);
GameContext.displayName = "GameContext";

const GameProvider = (props: { children: ReactNode }) => {
  const [character, setCharacter] = useState<CharacterState>(DEFAULT_CHARACTER_STATE);

  const updateCharacter = (update: Partial<CharacterState>) => {
    setCharacter({ ...character, ...update });
  };

  return <GameContext.Provider value={{ character, updateCharacter }}>{props.children}</GameContext.Provider>;
};

export default GameProvider;
