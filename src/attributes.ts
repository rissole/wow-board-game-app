import { IAttribute, AttributeAudience, AttributeName, DiceColour } from "./types";

export type Attribute =
  | DiceAttribute
  | DamageAttribute
  | AttritionAttribute
  | HealthAttribute
  | EnergyAttribute
  | DefenseAttribute
  | TravelAttribute;

export const parseAttribute = (rawAttributeName: string): Attribute => {
  const attrArr = rawAttributeName.split("_");

  const name = attrArr[0] as AttributeName;

  switch (name) {
    case "damage":
      return new DamageAttribute(attrArr[1] as AttributeAudience);
    case "dice":
      return new DiceAttribute(attrArr[1] as AttributeAudience, attrArr[2] as DiceColour);
    case "attrition":
      return new AttritionAttribute(attrArr[1] as AttributeAudience);
    case "health":
      return new HealthAttribute(attrArr[1] as AttributeAudience);
    case "energy":
      return new EnergyAttribute(attrArr[1] as AttributeAudience);
    case "defense":
      return new DefenseAttribute(attrArr[1] as AttributeAudience);
    case "travel":
      return new TravelAttribute();
  }
};

export class DiceAttribute implements IAttribute {
  readonly name = "dice";
  constructor(readonly audience: AttributeAudience, readonly diceColour: DiceColour) {}
}

export class DamageAttribute implements IAttribute {
  readonly name = "damage";
  constructor(readonly audience: AttributeAudience) {}
}

export class AttritionAttribute implements IAttribute {
  readonly name = "attrition";
  constructor(readonly audience: AttributeAudience) {}
}

export class HealthAttribute implements IAttribute {
  readonly name = "health";
  constructor(readonly audience: AttributeAudience) {}
}

export class EnergyAttribute implements IAttribute {
  readonly name = "energy";
  constructor(readonly audience: AttributeAudience) {}
}

export class DefenseAttribute implements IAttribute {
  readonly name = "defense";
  constructor(readonly audience: AttributeAudience) {}
}

export class TravelAttribute implements IAttribute {
  readonly name = "travel";
}
