import { useCallback, useContext } from "react";
import styled from "styled-components";
import SlotTypeIcons from "../SlotTypeIcons";
import CharacterSheetSlot from "../BaseCharacterSheetSlot";
import useFlipFlop from "../useFlipFlop";
import EquipCarousel from "../CarouselEquip";
import { GameContext } from "../GameProvider";
import { getPowerByName } from "../../data-accessor";
import { CardSlotMetadata, UniqueCardName } from "../../types";

interface Props {
  cardSlotMetadata: CardSlotMetadata;
}

const EmptyCharacterSheetSlot = (props: Props) => {
  const { purchasedCards } = useContext(GameContext);
  const { value: isModalOpen, toggle: toggleModal } = useFlipFlop(false);

  const handleSelectItem = useCallback(
    (name: UniqueCardName) => {
      const power = getPowerByName(name);
      console.log("selected", power);
      toggleModal();
    },
    [toggleModal]
  );

  const canEquipSomething = purchasedCards.length > 0;

  return (
    <>
      <CharacterSheetSlot
        style={{ justifyContent: "space-between" }}
        onClick={canEquipSomething ? toggleModal : undefined}
      >
        <SlotTypeIcons slotTypes={props.cardSlotMetadata.slotTypes} isEquippedSlot={false} />
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
