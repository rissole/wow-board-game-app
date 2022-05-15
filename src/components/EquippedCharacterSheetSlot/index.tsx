import styled from "styled-components";
import { AttributeImpact, SheetSlot } from "../../types";
import Icon from "../Icon";
import RenderedDice from "../RenderedDice";
import SlotTypeIcons from "../SlotTypeIcons";
import CharacterSheetSlot from "../BaseCharacterSheetSlot";

export interface Props {
  slot: SheetSlot;
}

interface AttributeProps {
  attributesImpacted: AttributeImpact[];
}

const EquippedCharacterSheetSlot = (props: Props) => {
  const slotData = props.slot.slotData;
  if (!slotData) {
    throw new Error("Should be data in slot");
  }
  return (
    <CharacterSheetSlot>
      <Container>
        <SlotTypeIcons slotTypes={props.slot.slotTypes} isEquippedSlot={true} />
        <MainContent>
          <Icon path={slotData.iconLink} height={36} width={36} />
          <CostBox>{slotData.energyCost}</CostBox>
          <NameBox>{slotData.name}</NameBox>
          <AttributesImpactedView attributesImpacted={slotData.attributesImpacted} />
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
            return <RenderedDice diceColour={diceAttr.diceColour} numOfDice={attr.maxImpact} key={index} />;
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
