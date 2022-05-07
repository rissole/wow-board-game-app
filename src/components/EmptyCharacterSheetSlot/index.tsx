import { CharacterSheetSlot } from "../../types";
import styled from "styled-components";
import SlotIcons from "../SlotIcons";

interface Props {
  slot: CharacterSheetSlot;
}

const EmptyCharacterSheetSlot = (props: Props) => {
  return (
    <Container>
      <SlotIcons slotTypes={props.slot.slotTypes} isEquippedSlot={false} />
      <AddIcon>+</AddIcon>
    </Container>
  );
};

const Container = styled.div`
  background-color: #aaa;
  width: 100vw;
  height: 55px;
  border: 1px solid black;
  gap: 4px;
  padding: 8px;
  justify-content: space-between;
  display: flex;
  align-content: center;
`;

const AddIcon = styled.div`
  font-size: 48px;
  line-height: 28px;
  font-weight: bold;
  text-align: center;
  color: #d51b1b;
`;

export default EmptyCharacterSheetSlot;
