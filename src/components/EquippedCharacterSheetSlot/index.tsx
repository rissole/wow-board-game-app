import styled from "styled-components";
import { AttributeImpact, CardSlot } from "../../types";
import Icon from "../Icon";
import RenderedDice from "../RenderedDice";
import SlotTypeIcons from "../SlotTypeIcons";
import CharacterSheetSlot from "../BaseCharacterSheetSlot";
import { getPowerByName } from "../../data-accessor";

export interface Props {
  slot: CardSlot;
}

interface AttributeProps {
  attributesImpacted: AttributeImpact[];
}

const EquippedCharacterSheetSlot = (props: Props) => {
  if (props.slot.equipped[0] === undefined) {
    throw new Error(
      `Nothing equipped in this slot you're trying to look at (slotNumber: ${props.slot.metadata.slotNumber})`
    );
  }
  /**
   * TODO support multiple cards in a slot
   */
  const equippedCardData = getPowerByName(props.slot.equipped[0]);
  if (equippedCardData === undefined) {
    throw new Error(`Couldn't find data for card ${props.slot.equipped[0]} in slot ${props.slot.metadata.slotNumber}`);
  }
  return (
    <CharacterSheetSlot>
      <Container>
        <SlotTypeIcons slotTypes={props.slot.metadata.slotTypes} isEquippedSlot={true} />
        <MainContent>
          <Icon path={equippedCardData.iconLink} height={36} width={36} />
          <CostBox>{equippedCardData.energyCost}</CostBox>
          <NameBox>{equippedCardData.name}</NameBox>
          <AttributesImpactedView attributesImpacted={equippedCardData.attributesImpacted} />
        </MainContent>
      </Container>
    </CharacterSheetSlot>
  );
};

const AttributesImpactedView = (props: AttributeProps) => {
  return (
    <AttributesContainer>
      {props.attributesImpacted
        .filter((attr) => attr.attribute.name === "dice")
        .sort()
        .map((attr, index) => {
          if (attr.attribute.name === "dice") {
            const diceAttr = attr.attribute;
            return <RenderedDice diceColor={diceAttr.diceColor} numOfDice={attr.maxImpact} key={index} />;
          }
          return undefined;
        })}
    </AttributesContainer>
  );
};

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px;
  flex-grow: 0;
`;

const CostBox = styled.div`
  background-color: #ffffff;
  color: #000000;
  width: 24px;
  height: 36px;
  text-align: center;
  padding: 6px 0;
  border-radius: 4px;
  border: 1px solid black;
  font-size: 18px;
`;

const AttributesContainer = styled.div`
  display: flex;
  align-content: center;
  gap: 4px;
`;

const NameBox = styled.span`
  max-width: 96px;
  font-weight: 600;
`;

export default EquippedCharacterSheetSlot;
