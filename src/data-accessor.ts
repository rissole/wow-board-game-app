import { CharacterLevel, DiceColour, HeroClass, LevelStats, Phase, Power, PowerType } from "./types";
import powersJson from "./powers.csv";
import levelsJson from "./levels.csv";

type CsvFile = ReadonlyArray<ReadonlyArray<string | number | null>>;

let powers: Power[] | undefined;
let levelStats: LevelStats[] | undefined;

export const getPowers = () => {
  if (!powers) {
    powers = parseCsvToPower(powersJson.slice(1));
  }
  return powers;
};

export const getLevelStats = () => {
  if (!levelStats) {
    levelStats = parseCsvToLevels(levelsJson.slice(1));
  }
  return levelStats;
};

export const statsForLevel = (level: CharacterLevel): LevelStats => {
  const stat = getLevelStats().find((stat) => stat.level === level);

  if (stat === undefined) {
    throw new Error("Could not find level");
  }

  return stat;
};

function parseCsvToPower(csv: CsvFile): Power[] {
  return csv.map((row) => {
    return {
      name: row[0] as string,
      class: row[1] as HeroClass,
      type: row[2] as PowerType,
      requiredLevel: row[3] as CharacterLevel,
      goldCost: row[4] as number,
      energyCost: row[5] as number,
      rawDescription: row[6] as string,
      iconLink: row[7] as string,
      phase: row[8] as Phase,
      dependantOn: row[9] === null ? undefined : (row[9] as string).split(", "),
      attributesImpacted: (row[10] as string).split(", "),
      effect: row[11] as string,
      spotColour: row[12] === null ? undefined : (row[12] as string).split(", ").map((item) => item as DiceColour),
      spotAmount: row[13] === null ? undefined : (row[13] as string),
      maxSpotAmount: row[14] === null ? undefined : (row[14] as number),
    };
  });
}

export function parseCsvToLevels(csv: CsvFile): LevelStats[] {
  return csv.map((row) => {
    return {
      class: row[0] as HeroClass,
      level: row[1] as CharacterLevel,
      health: row[2] as number,
      energy: row[3] as number,
    };
  });
}
