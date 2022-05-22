import { useCallback, useContext, useState } from "react";
import CharacterSheetSlot from "../BaseCharacterSheetSlot";
import useFlipFlop from "../useFlipFlop";
import EquipCarousel from "../CarouselEquip";
import { GameContext } from "../GameProvider";
import { CardSlotMetadata, UniqueCardName } from "../../types";
import { ALL_POWERS } from "../../data-accessor";
import { getEquippableCards } from "../../util/data";
import Toast from "../Toast";
import { SLOT_TYPE_TO_ICON_PATH } from "../SlotTypeIcons/util";

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
        <EmptySlotTypeIcons slotTypes={props.cardSlotMetadata.slotTypes} />
      </CharacterSheetSlot>
      {isModalOpen && <EquipCarousel onClose={closeModal} onSelectItem={handleSelectItem} />}
      <Toast durationMilliseconds={2500} text={toastText} />
    </>
  );
};

const EmptySlotTypeIcons = ({ slotTypes }: { slotTypes: CardSlotMetadata["slotTypes"] }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        paddingTop: "10px",
        gap: "0px",
      }}
    >
      {slotTypes.map((slotType, i) => {
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              alt=""
              src={SLOT_TYPE_TO_ICON_PATH[slotType.primary]}
              style={{
                height: "42px",
                width: "42px",
                opacity: "70%",
                borderRadius: "2px",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default EmptyCharacterSheetSlot;
