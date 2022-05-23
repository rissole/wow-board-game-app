import {
  AttributeImpact,
  CharacterLevel,
  DiceColor,
  HeroClass,
  LevelStats,
  Phase,
  Power,
  SlotPrimaryType,
  SlotSecondaryType,
  SlotType,
  UniqueCardName,
  Talent,
  UniqueTalentName,
  CardSlotMetadata,
  isValidSlotNumber,
} from "./types";
import powersJson from "./powers.csv";
import levelsJson from "./levels.csv";
import slotsJson from "./slots.csv";
import talentsJson from "./talents.csv";
import { parseAttribute } from "./attributes";

type CsvFile = ReadonlyArray<ReadonlyArray<string | number | null>>;

const RACIAL_SLOT: CardSlotMetadata = {
  slotNumber: 0,
  slotTypes: [
    {
      primary: "racial",
    },
  ],
};
export const ALL_POWERS: ReadonlyArray<Power> = parseCsvToPower(powersJson.slice(1));
export const LEVEL_STATS: ReadonlyArray<LevelStats> = parseCsvToLevels(levelsJson.slice(1));

export const HERO_CLASS_CARD_SLOT_METADATA: { [k in HeroClass]?: ReadonlyArray<CardSlotMetadata> } = parseCsvToSlots(
  slotsJson.slice(1)
);

export const ALL_TALENTS: Record<UniqueTalentName, Talent> = parseCsvToTalents(talentsJson.slice(1));
// TODO: Needs to take a hero class when we fill in the CSV data
export const statsForLevel = (level: CharacterLevel, heroClass: HeroClass): LevelStats => {
  let stat = LEVEL_STATS.find((stat) => stat.level === level && stat.class === heroClass);

  if (stat === undefined) {
    console.warn(`Could not find stats for Level ${level} / ${heroClass}, falling back to druid`);
    stat = LEVEL_STATS.find((stat) => stat.level === level && stat.class === "druid");
    if (stat === undefined) {
      throw new Error("Could not find stats for class/level");
    }
  }

  return stat;
};

// TODO: This is really silly, this should be in a map
export const getPowerByName = (name: UniqueCardName): Power => {
  const maybePower = ALL_POWERS.find((p) => p.name === name);

  if (maybePower) {
    return maybePower;
  }

  throw new Error("Unable to find power data");
};

export const getTalentsForLevel = (level: CharacterLevel) =>
  Object.values(ALL_TALENTS).filter((talent) => talent.requiredLevel <= level);

export const getAllTalents = () => Object.values(ALL_TALENTS);

function parseCsvToPower(csv: CsvFile): Power[] {
  return csv.map((row) => {
    return {
      name: row[0] as string,
      class: row[1] as HeroClass,
      type: { primary: row[2] as SlotPrimaryType },
      requiredLevel: row[3] as CharacterLevel,
      goldCost: row[4] as number,
      energyCost: row[5] as number,
      rawDescription: row[6] as string,
      iconLink: row[7] as string,
      phase: row[8] as Phase,
      dependantOn: row[9] === null ? undefined : (row[9] as string).split(", "),
      attributesImpacted: parseAttributesImpacted(row[10] as string),
      effect: row[11] as string,
      spotColor: row[12] === null ? undefined : (row[12] as string).split(", ").map((item) => item as DiceColor),
      spotAmount: row[13] === null ? undefined : (row[13] as string),
      maxSpotAmount: row[14] === null ? undefined : (row[14] as number),
    };
  });
}

function parseAttributesImpacted(rawAttributesEntry: string): AttributeImpact[] {
  return rawAttributesEntry.split(", ").map((rawAttribute) => {
    const attrArr = rawAttribute.split(" ");
    return {
      attribute: parseAttribute(attrArr[0]!),
      minImpact: parseInt(attrArr[1]!, 10),
      maxImpact: parseInt(attrArr[attrArr.length - 1]!, 10),
    };
  });
}

function parseCsvToLevels(csv: CsvFile): ReadonlyArray<LevelStats> {
  return csv.map((row) => {
    return {
      class: (row[0] as string).toLowerCase() as HeroClass,
      level: row[1] as CharacterLevel,
      health: row[2] as number,
      energy: row[3] as number,
    };
  });
}

// csv headers: className, slotNumber, primarytype1, secondarytype1, primarytype2, secondarytype2
function parseCsvToSlots(csv: CsvFile): { [heroClass: string]: CardSlotMetadata[] } {
  const result: { [heroClass: string]: CardSlotMetadata[] } = {};
  csv.forEach((row) => {
    const heroClassString = (row[0] as string).toLowerCase();
    result[heroClassString] = result[heroClassString] ?? [RACIAL_SLOT];
    const slots = result[heroClassString]!;
    // TODO: do something with default in row6

    const slotTypes: SlotType[] = [
      {
        primary: row[2] as SlotPrimaryType,
        secondary: row[3] ? (row[3] as SlotSecondaryType) : undefined,
      },
    ];
    if (row[4]) {
      slotTypes.push({
        primary: row[4] as SlotPrimaryType,
        secondary: row[5] ? (row[5] as SlotSecondaryType) : undefined,
      });
    }

    const slotNumber = row[1] as number;
    if (!isValidSlotNumber(slotNumber)) {
      throw new Error(`${slotNumber} is not a valid slot number`);
    }
    slots.push({
      slotNumber,
      slotTypes,
    });
  });
  return result;
}

//csv headers: name, class, level, rawDescription, iconLink
function parseCsvToTalents(csv: CsvFile): Record<UniqueTalentName, Talent> {
  return csv.reduce<Record<UniqueTalentName, Talent>>((talents, row) => {
    const talent = {
      name: row[0] as UniqueTalentName,
      class: row[1] as HeroClass,
      requiredLevel: row[2] as CharacterLevel,
      rawDescription: row[3] as string,
      iconLink: row[4] as string,
    };

    talents[talent.name] = talent;
    return talents;
  }, {});
}
