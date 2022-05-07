import React, { createContext, ReactNode, useState } from "react";

import { CharacterLevel, Faction, HeroClass, CardId } from "../../types";

export interface CharacterState {
  heroClass: HeroClass;
  faction: Faction;
  level: CharacterLevel;
  health: number;
  energy: number;
  gold: number;
}

export interface PowerState {
  id: CardId;
  isEquipped: boolean;
}

export type GameContextType = {
  // Character information
  character: CharacterState;
  updateCharacter: (update: Partial<CharacterState>) => void;

  // Powers trained/owned by the player
  powers: PowerState[];
  addPower: (id: CardId) => void;
  removePower: (id: CardId) => void;
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
  addPower: () => {},
  removePower: () => {},
};

export const GameContext = createContext<GameContextType>(DEFAULT_GAME_STATE);
GameContext.displayName = "GameContext";

const GameProvider = (props: { children: ReactNode }) => {
  const [character, setCharacter] = useState<CharacterState>(DEFAULT_CHARACTER_STATE);
  const [powers, setPowers] = useState<PowerState[]>([]);

  const updateCharacter = (update: Partial<CharacterState>) => {
    setCharacter({ ...character, ...update });
  };

  const addPower = (id: CardId) => {
    setPowers([...powers, { id, isEquipped: false }]);
  };

  const removePower = (id: CardId) => {
    setPowers(powers.filter((power) => power.id !== id));
  };

  return (
    <GameContext.Provider value={{ character, updateCharacter, powers, addPower, removePower }}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
