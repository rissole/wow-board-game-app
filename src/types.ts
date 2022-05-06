export type StatType = "health" | "energy" | "gold";
export type CharacterLevel = 1 | 2 | 3 | 4 | 5;
export type Faction = "alliance" | "horde";
export type HeroClass = "paladin" | "warlock" | "rogue" | "mage" | "hunter" | "druid" | "warrior" | "shaman" | "priest";
export type DiceColour = "green" | "red" | "blue";
export type PowerType = "active" | "instant" | "weapon";
export type Phase = "End_Reroll" | "Start_Dice" | "Start_Action" | "Place_Tokens" | "Team_Health_Down" | "Global";
export type Screen = "loading" | "main" | "character-select";
export type MainScreenList = "powers" | "inventory";

export const isValidLevel = (level: number): level is CharacterLevel =>
  level === 1 || level === 2 || level === 3 || level === 4 || level === 5;

export interface CharacterStats {
  health: {
    current: number;
    max: number;
  };
  energy: {
    current: number;
    max: number;
  };
  gold: {
    current: number;
  };
}

export type Power = {
  name: string;
  class: HeroClass;
  type: PowerType;
  requiredLevel: CharacterLevel;
  goldCost: number;
  energyCost: number;
  rawDescription: string;
  iconLink: string;
  phase: Phase;
  dependantOn?: string[];
  attributesImpacted?: string[];
  effect: string;
  spotColour?: DiceColour[];
  spotAmount?: string;
  maxSpotAmount?: number;
};

export type LevelStats = {
  class: HeroClass;
  level: CharacterLevel;
  health: number;
  energy: number;
};
