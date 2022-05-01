export type StatType = "health" | "energy" | "gold";

export type CharacterLevel = 1 | 2 | 3 | 4 | 5;
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
