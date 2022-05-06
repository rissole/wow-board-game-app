import { AttributeImpact, CharacterLevel, DiceColour, HeroClass, LevelStats, Phase, Power, SlotType } from "./types";
import powersJson from "./powers.csv";
import levelsJson from "./levels.csv";
import { parseAttribute } from "./attributes";

type CsvFile = ReadonlyArray<ReadonlyArray<string | number | null>>;

export const powers: Power[] = parseCsvToPower(powersJson.slice(1));
export const levelStats: LevelStats[] = parseCsvToLevels(levelsJson.slice(1));

export const statsForLevel = (level: CharacterLevel): LevelStats => {
  const stat = levelStats.find((stat) => stat.level === level);

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
      type: row[2] as SlotType,
      requiredLevel: row[3] as CharacterLevel,
      goldCost: row[4] as number,
      energyCost: row[5] as number,
      rawDescription: row[6] as string,
      iconLink: row[7] as string,
      phase: row[8] as Phase,
      dependantOn: row[9] === null ? undefined : (row[9] as string).split(", "),
      attributesImpacted: parseAttributesImpacted(row[10] as string),
      effect: row[11] as string,
      spotColour: row[12] === null ? undefined : (row[12] as string).split(", ").map((item) => item as DiceColour),
      spotAmount: row[13] === null ? undefined : (row[13] as string),
      maxSpotAmount: row[14] === null ? undefined : (row[14] as number),
    };
  });
}

function parseAttributesImpacted(rawAttributesEntry: string): AttributeImpact[] {
  return rawAttributesEntry.split(", ").map((rawAttribute) => {
    const attrArr = rawAttribute.split(" ");
    return {
      attribute: parseAttribute(attrArr[0]),
      minImpact: parseInt(attrArr[1], 10),
      maxImpact: parseInt(attrArr[attrArr.length - 1], 10),
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
