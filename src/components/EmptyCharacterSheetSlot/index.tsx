import { useCallback, useContext } from "react";
import styled from "styled-components";
import SlotTypeIcons from "../SlotTypeIcons";
import CharacterSheetSlot from "../BaseCharacterSheetSlot";
import useFlipFlop from "../useFlipFlop";
import EquipCarousel from "../CarouselEquip";
import { GameContext } from "../GameProvider";
import { getPowerById } from "../../data-accessor";
import { CardId, SheetSlot } from "../../types";

interface Props {
  slot: SheetSlot;
}

const EmptyCharacterSheetSlot = (props: Props) => {
  const { powers } = useContext(GameContext);
  const { value: isModalOpen, toggle: toggleModal } = useFlipFlop(false);

  const handleSelectItem = useCallback(
    (id: CardId) => {
      const power = getPowerById(id);
      console.log(power);
      toggleModal();
    },
    [toggleModal]
  );

  const hasEquippableItem = !!powers.length;

  return (
    <>
      <CharacterSheetSlot
        style={{ justifyContent: "space-between" }}
        onClick={hasEquippableItem ? toggleModal : undefined}
      >
        <SlotTypeIcons slotTypes={props.slot.slotTypes} isEquippedSlot={false} />
        <AddIcon>+</AddIcon>
      </CharacterSheetSlot>
      {isModalOpen && <EquipCarousel onClose={toggleModal} onSelectItem={handleSelectItem} />}
    </>
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
