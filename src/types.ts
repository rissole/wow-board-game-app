import { Attribute } from "./attributes";

export type StatType = "health" | "energy" | "gold";
export type CharacterLevel = 1 | 2 | 3 | 4 | 5;
export type Faction = "alliance" | "horde";
export type HeroClass = "paladin" | "warlock" | "rogue" | "mage" | "hunter" | "druid" | "warrior" | "shaman" | "priest";
export type DiceColour = "green" | "red" | "blue";
export type Phase = "End_Reroll" | "Start_Dice" | "Start_Action" | "Place_Tokens" | "Team_Health_Down" | "Global";
export type Screen = "loading" | "main" | "character-select";
export type MainScreenList = "powers" | "inventory" | "reference";
export type AttributeName = "damage" | "dice" | "attrition" | "health" | "energy" | "defense" | "travel" | "threat";
export type AttributeAudience = "self" | "enemy" | "team";
export type SlotPrimaryType = "active" | "instant" | "weapon" | "general" | "armor" | "racial";
export type SlotSecondaryType = "mace" | "staff" | "cloth" | "leather";

export type CardId = string;

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

export type SheetSlot = {
  slotNumber: number;
  slotTypes: SlotType[];
  slotData?: CharacterSheetSlotData;
};

export type CharacterSheetSlotData = {
  name: string;
  iconLink: string;
  energyCost: number;
  attributesImpacted: AttributeImpact[];
};
