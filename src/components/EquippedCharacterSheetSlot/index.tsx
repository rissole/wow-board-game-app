import styled from "styled-components";
import { AttributeImpact, CharacterSheetSlot, SlotType } from "../../types";
import activeSpellPath from "./active_spell_icon.jpg";
import instantSpellPath from "./instant_spell_icon.jpg";
import weaponPath from "./weapon_icon.jpg";
import Icon from "../Icon";
import RenderedDice from "../RenderedDice";

export interface Props {
  slot: CharacterSheetSlot;
}

interface AttributeProps {
  attributesImpacted: AttributeImpact[];
}

interface SlotIconsProps {
  slotTypes: SlotType[];
}

const slotTypeToIcon: Record<SlotType, string> = {
  active: activeSpellPath,
  instant: instantSpellPath,
  weapon: weaponPath,
};

const EquippedCharacterSheetSlot = (props: Props) => {
  return (
    <Container>
      <SlotIcons slotTypes={props.slot.slotTypes} />
      <MainContent>
        <Icon path={props.slot.iconLink} height={32} width={32} />
        <CostBox>{props.slot.energyCost}</CostBox>
        <div style={{ width: "100px" }}> {props.slot.name} </div>
        <AttributesImpactedView attributesImpacted={props.slot.attributesImpacted} />
      </MainContent>
    </Container>
  );
};

const AttributesImpactedView = (props: AttributeProps) => {
  return (
    <AttributesContainer>
      {props.attributesImpacted
        .filter((attr) => attr.attribute.name === "dice")
        .sort()
        .map((attr) => {
          if (attr.attribute.name === "dice") {
            const diceAttr = attr.attribute;
            return <RenderedDice diceColour={diceAttr.diceColour} numOfDice={attr.maxImpact} />;
          }
          return undefined;
        })}
    </AttributesContainer>
  );
};

const SlotIcons = (props: SlotIconsProps) => {
  return (
    <SlotIconsContainer>
      {props.slotTypes.map((slotType) => {
        return <Icon height={18} width={18} path={slotTypeToIcon[slotType]} />;
      })}
    </SlotIconsContainer>
  );
};

const Container = styled.div`
  background-color: #aaa;
  width: 100vw;
  height: 55px;
  border: 1px solid black;
  display: flex;
  gap: 4px;
  padding: 8px;
`;

const MainContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px;
  flex-grow: 0;
`;

const SlotIconsContainer = styled.div``;

const CostBox = styled.div`
  background-color: white;
  width: 24px;
  height: 32px;
  text-align: center;
  padding: 6px 0;
  border-radius: 4px;
  border: 1px solid black;
`;

const AttributesContainer = styled.div`
  display: flex;
  align-content: center;
  gap: 4px;
`;

export default EquippedCharacterSheetSlot;
