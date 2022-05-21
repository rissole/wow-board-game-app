import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import SlotTypeIcons from "../SlotTypeIcons";
import CharacterSheetSlot from "../BaseCharacterSheetSlot";
import useFlipFlop from "../useFlipFlop";
import EquipCarousel from "../CarouselEquip";
import { GameContext } from "../GameProvider";
import { CardSlotMetadata, UniqueCardName } from "../../types";
import { ALL_POWERS } from "../../data-accessor";
import { getEquippableCards } from "../../util/data";
import Toast from "../Toast";

interface Props {
  cardSlotMetadata: CardSlotMetadata;
}

const EmptyCharacterSheetSlot = (props: Props) => {
  const { purchasedCards, equipCardToSlot, cardSlots } = useContext(GameContext);
  const { value: isModalOpen, setOff: closeModal, toggle: toggleModal } = useFlipFlop(false);
  const [toastText, setToastText] = useState<React.ReactNode>();

  const handleSelectItem = useCallback(
    (name: UniqueCardName) => {
      equipCardToSlot(props.cardSlotMetadata.slotNumber, name);
      closeModal();
    },
    [closeModal, equipCardToSlot, props.cardSlotMetadata.slotNumber]
  );

  const canEquipSomething = getEquippableCards(ALL_POWERS, purchasedCards, cardSlots).length > 0;
  const showNothingToEquipToast = () =>
    setToastText(
      <span>
        <p>Nothing to equip!</p>
        <p>Try learning a spell or buying an item.</p>
      </span>
    );

  return (
    <>
      <CharacterSheetSlot
        style={{ justifyContent: "space-between" }}
        onClick={canEquipSomething ? toggleModal : showNothingToEquipToast}
      >
        <SlotTypeIcons slotTypes={props.cardSlotMetadata.slotTypes} isEquippedSlot={false} />
        <AddIcon>+</AddIcon>
      </CharacterSheetSlot>
      {isModalOpen && <EquipCarousel onClose={closeModal} onSelectItem={handleSelectItem} />}
      <Toast durationMilliseconds={2500} text={toastText} />
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
