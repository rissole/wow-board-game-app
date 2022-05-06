import { Attribute, AttributeAudience, AttributeName, DiceColour } from "./types";

export const parseAttribute = (rawAttributeName: string): Attribute => {
  const attrArr = rawAttributeName.split("_");

  const name = attrArr[0] as AttributeName;

  if (name === "dice") {
    return new DiceAttribute(name, attrArr[1] as AttributeAudience, attrArr[2] as DiceColour);
  } else {
    return {
      name,
      audience: attrArr.length === 2 ? (attrArr[1] as AttributeAudience) : undefined,
    };
  }
};

export class DiceAttribute implements Attribute {
  readonly name: AttributeName;
  readonly audience: AttributeAudience;
  readonly diceColour: DiceColour;

  constructor(name: AttributeName, audience: AttributeAudience, diceColour: DiceColour) {
    this.name = name;
    this.audience = audience;
    this.diceColour = diceColour;
  }
}
