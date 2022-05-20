import {
  AttributeImpact,
  CharacterLevel,
  SheetSlot,
  DiceColour,
  HeroClass,
  LevelStats,
  Phase,
  Power,
  SlotPrimaryType,
  SlotSecondaryType,
  SlotType,
  CardId,
  Talent,
  TalentId,
} from "./types";
import powersJson from "./powers.csv";
import levelsJson from "./levels.csv";
import slotsJson from "./slots.csv";
import talentsJson from "./talents.csv";
import { parseAttribute } from "./attributes";

type CsvFile = ReadonlyArray<ReadonlyArray<string | number | null>>;

const RACIAL_SLOT: SheetSlot = {
  slotNumber: 0,
  slotTypes: [
    {
      primary: "racial",
    },
  ],
};
export const powers: Power[] = parseCsvToPower(powersJson.slice(1));
export const levelStats: LevelStats[] = parseCsvToLevels(levelsJson.slice(1));

export const slots: SheetSlot[] = parseCsvToSlots(slotsJson.slice(1));

export const talents: Record<TalentId, Talent> = parseCsvToTalents(talentsJson.slice(1));
// TODO: Needs to take a hero class when we fill in the CSV data
export const statsForLevel = (level: CharacterLevel): LevelStats => {
  const stat = levelStats.find((stat) => stat.level === level);

  if (stat === undefined) {
    throw new Error("Could not find level");
  }

  return stat;
};

// TODO: This is really silly, this should be in a map
export const getPowerById = (id: CardId): Power | void => {
  return powers.find((p) => p.name === id);
};

export const talentsForLevel = (level: CharacterLevel): Talent[] => {
  return Object.values(talents).filter((talent) => talent.requiredLevel <= level);
};

export const getAllTalents = (): Talent[] => {
  return Object.values(talents);
};

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

function parseCsvToLevels(csv: CsvFile): LevelStats[] {
  return csv.map((row) => {
    return {
      class: row[0] as HeroClass,
      level: row[1] as CharacterLevel,
      health: row[2] as number,
      energy: row[3] as number,
    };
  });
}

// csv headers: className, slotNumber, primarytype1, secondarytype1, primarytype2, secondarytype2
function parseCsvToSlots(csv: CsvFile): SheetSlot[] {
  return csv.reduce(
    (slots, row) => {
      //row[0] is class name
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

      slots.push({
        slotNumber: row[1] as number,
        slotTypes,
      });
      return slots;
    },
    [RACIAL_SLOT]
  );
}

//csv headers: name, class, level, rawDescription, iconLink
function parseCsvToTalents(csv: CsvFile): Record<TalentId, Talent> {
  return csv.reduce((talents, row) => {
    const talent = {
      name: row[0] as TalentId,
      class: row[1] as HeroClass,
      requiredLevel: row[2] as CharacterLevel,
      rawDescription: row[3] as string,
      iconLink: row[4] as string,
    };

    talents[talent.name] = talent;
    return talents;
  }, {} as Record<TalentId, Talent>);
}
