import { useCallback, useContext, useMemo, useState } from "react";
import CharacterSheetSlot from "../BaseCharacterSheetSlot";
import useFlipFlop from "../useFlipFlop";
import { GameContext } from "../GameProvider";
import { CardSlotMetadata, UniqueCardName } from "../../types";
import { ALL_POWERS, getPowerByName } from "../../data-accessor";
import { getEquippableCards } from "../../util/data";
import Toast from "../Toast";
import { SLOT_TYPE_TO_ICON_PATH } from "../SlotTypeIcons/util";
import Carousel, { ValidatedSelectedItem } from "../Carousel";
import PowerCarouselCard from "../PowerCarouselCard";

interface Props {
  cardSlotMetadata: CardSlotMetadata;
}

const EmptyCharacterSheetSlot = (props: Props) => {
  const { purchasedCards, equipCardToSlot, cardSlots, character } = useContext(GameContext);
  const { value: isModalOpen, setOff: closeModal, toggle: toggleModal } = useFlipFlop(false);
  const [toastText, setToastText] = useState<React.ReactNode>();

  const handleSelectItem = useCallback(
    (name: UniqueCardName) => {
      equipCardToSlot(props.cardSlotMetadata.slotNumber, name);
      closeModal();
    },
    [closeModal, equipCardToSlot, props.cardSlotMetadata.slotNumber]
  );

  const canEquipItem = useCallback(
    (name: UniqueCardName): ValidatedSelectedItem => {
      const power = getPowerByName(name);
      return {
        canSelect: power !== undefined && !(power.type.primary === "active" && character.energy < power.energyCost),
        errorMessage: "Not enough energy to equip!",
      };
    },
    [character.energy]
  );

  const carouselItems = useMemo(
    () =>
      getEquippableCards(ALL_POWERS, purchasedCards, cardSlots, props.cardSlotMetadata.slotTypes).map((p) => {
        return {
          name: p.name,
          renderNode: () => <PowerCarouselCard power={p} />,
        };
      }),
    [cardSlots, props.cardSlotMetadata.slotTypes, purchasedCards]
  );

  const showNothingToEquipToast = () =>
    setToastText(
      <span>
        <p>Nothing to equip!</p>
        <p>Try learning a spell or buying an item for this slot.</p>
      </span>
    );

  return (
    <>
      <CharacterSheetSlot
        style={{ justifyContent: "space-between" }}
        onClick={carouselItems.length > 0 ? toggleModal : showNothingToEquipToast}
      >
        <EmptySlotTypeIcons slotTypes={props.cardSlotMetadata.slotTypes} />
      </CharacterSheetSlot>
      {isModalOpen && (
        <Carousel
          items={carouselItems}
          onClose={closeModal}
          onSelectItem={handleSelectItem}
          isAbleToSelect={canEquipItem}
          buttonText="Equip"
        />
      )}
      <Toast durationMilliseconds={2500} text={toastText} />
    </>
  );
};

// could be cleaner and better leverage styled components, but as of the
// time of writing the design is still up in the air, so not investing in that
// cleanup until we have a bit more clarity
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
        gap: "2px",
      }}
    >
      {slotTypes.map((slotType, i) => {
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img
              alt=""
              src={SLOT_TYPE_TO_ICON_PATH[slotType.primary]}
              style={{
                height: "42px",
                width: "42px",
                opacity: "70%",
                borderRadius: "8px",
                border: "1px solid black",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default EmptyCharacterSheetSlot;
