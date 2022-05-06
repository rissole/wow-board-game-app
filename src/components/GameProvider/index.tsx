import React, { createContext, ReactNode, useState } from "react";

import { CharacterLevel, Faction, HeroClass, Power } from "../../types";

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
  powers: Power[]; // TODO: Rework how we represent equipped cards
  updateCharacter: (update: Partial<CharacterState>) => void;
  setPowers: (powers: Power[]) => void;
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

  powers: [],
  setPowers: () => {},
};

export const GameContext = createContext<GameContextType>(DEFAULT_GAME_STATE);
GameContext.displayName = "GameContext";

const GameProvider = (props: { children: ReactNode }) => {
  const [character, setCharacter] = useState<CharacterState>(DEFAULT_CHARACTER_STATE);
  const [powers, setPowers] = useState<Power[]>([]);

  const updateCharacter = (update: Partial<CharacterState>) => {
    setCharacter({ ...character, ...update });
  };

  return (
    <GameContext.Provider value={{ character, updateCharacter, powers, setPowers }}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
