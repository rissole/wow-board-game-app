import React, { createContext, ReactNode, useCallback, useMemo, useState } from "react";
import { statsForLevel } from "../../data-accessor";

import { CharacterLevel, Faction, HeroClass, CardId, isValidLevel } from "../../types";

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
  /**
   * returns true if successfully levelled up, false otherwise
   * (will be false if you try to level up to an invalid level, i.e. beyond max)
   */
  levelUp: () => boolean;
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
  levelUp: () => false,
};

export const GameContext = createContext<GameContextType>(DEFAULT_GAME_STATE);
GameContext.displayName = "GameContext";

const GameProvider = (props: { children: ReactNode }) => {
  const [character, setCharacter] = useState<CharacterState>(DEFAULT_CHARACTER_STATE);
  const [powers, setPowers] = useState<PowerState[]>([]);

  const updateCharacter = useCallback(
    (update: Partial<CharacterState>) => {
      setCharacter((currentCharacter) => ({ ...currentCharacter, ...update }));
    },
    [setCharacter]
  );

  const addPower = useCallback(
    (id: CardId) => {
      setPowers((currentPowers) => [...currentPowers, { id, isEquipped: false }]);
    },
    [setPowers]
  );

  const removePower = useCallback(
    (id: CardId) => {
      setPowers((currentPowers) => currentPowers.filter((power) => power.id !== id));
    },
    [setPowers]
  );

  const levelUp = useCallback(() => {
    const newLevel = character.level + 1;
    if (isValidLevel(newLevel)) {
      const newStats = statsForLevel(newLevel);
      updateCharacter({
        level: newLevel,
        health: newStats.health,
        energy: newStats.energy,
      });
      return true;
    }
    return false;
  }, [character.level, updateCharacter]);

  const contextValue = useMemo(
    () => ({ character, updateCharacter, powers, addPower, removePower, levelUp }),
    [addPower, character, levelUp, powers, removePower, updateCharacter]
  );

  return <GameContext.Provider value={contextValue}>{props.children}</GameContext.Provider>;
};

export default GameProvider;
