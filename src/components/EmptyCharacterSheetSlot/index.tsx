import { SheetSlot } from "../../types";
import styled from "styled-components";
import SlotIcons from "../SlotIcons";
import CharacterSheetSlot from "../CharacterSheetSlot";

interface Props {
  slot: SheetSlot;
}

const EmptyCharacterSheetSlot = (props: Props) => {
  return (
    <CharacterSheetSlot style={{ justifyContent: "space-between" }}>
      <SlotIcons slotTypes={props.slot.slotTypes} isEquippedSlot={false} />
      <AddIcon>+</AddIcon>
    </CharacterSheetSlot>
  );
};

const AddIcon = styled.div`
  font-size: 48px;
  line-height: 28px;
  font-weight: bold;
  text-align: center;
  color: #d51b1b;
`;

export default EmptyCharacterSheetSlot;
