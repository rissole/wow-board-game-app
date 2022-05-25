import { Attribute } from "./attributes";

export type StatType = "health" | "energy" | "gold";
export type CharacterLevel = 1 | 2 | 3 | 4 | 5;
export type Faction = "alliance" | "horde";
export type HeroClass = "paladin" | "warlock" | "rogue" | "mage" | "hunter" | "druid" | "warrior" | "shaman" | "priest";
export type DiceColor = "green" | "red" | "blue";
export type Phase = "End_Reroll" | "Start_Dice" | "Start_Action" | "Place_Tokens" | "Team_Health_Down" | "Global";
export type Screen = "loading" | "main" | "character-select";
export type MainScreenList = "powers" | "inventory" | "reference";
export type AttributeName = "damage" | "dice" | "attrition" | "health" | "energy" | "defense" | "travel" | "threat";
export type AttributeAudience = "self" | "enemy" | "team";
export type SlotPrimaryType = "active" | "instant" | "weapon" | "general" | "armor" | "racial";
export type SlotSecondaryType = "mace" | "staff" | "cloth" | "leather";
export type SlotNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * the uniquely identifying name of this card
 */
export type UniqueCardName = string;
/**
 * the uniquely identifying name of this talent
 */
export type UniqueTalentName = string;

export const MAX_CHARACTER_LEVEL: CharacterLevel = 5;
export const isValidLevel = (n: number): n is CharacterLevel =>
  Array.from({ length: MAX_CHARACTER_LEVEL })
    .map((_, index) => index + 1)
    .includes(n);

export const isValidSlotNumber = (n: number): n is SlotNumber =>
  Array.from({ length: 8 })
    .map((_, index) => index)
    .includes(n);

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

export type SlotType = {
  primary: SlotPrimaryType;
  secondary?: SlotSecondaryType;
};

export interface AttributeImpact {
  attribute: Attribute;
  minImpact: number;
  maxImpact: number;
}

export interface IAttribute {
  name: AttributeName;
  audience?: AttributeAudience;
}

export type Power = {
  name: string;
  class: HeroClass;
  type: SlotType;
  requiredLevel: CharacterLevel;
  goldCost: number;
  energyCost: number;
  rawDescription: string;
  iconLink: string;
  phase: Phase;
  dependantOn?: string[];
  attributesImpacted: AttributeImpact[];
  effect: string;
  spotColor?: DiceColor[];
  spotAmount?: string;
  maxSpotAmount?: number;
};

export type LevelStats = {
  class: HeroClass;
  level: CharacterLevel;
  health: number;
  energy: number;
};

export type CardSlot = {
  metadata: CardSlotMetadata;
  equipped: UniqueCardName[];
};

/**
 * metadata about a slot for a card on the character sheet
 */
export type CardSlotMetadata = {
  slotNumber: SlotNumber;
  slotTypes: SlotType[];
};

export type CharacterSheetSlotData = {
  name: string;
  iconLink: string;
  energyCost: number;
  attributesImpacted: AttributeImpact[];
};

export type Talent = {
  name: UniqueTalentName;
  class: HeroClass;
  requiredLevel: CharacterLevel;
  rawDescription: string;
  iconLink: string;
};
