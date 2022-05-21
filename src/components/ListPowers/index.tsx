import React, { useContext } from "react";

import EquippedCharacterSheetSlot from "../EquippedCharacterSheetSlot";
import EmptyCharacterSheetSlot from "../EmptyCharacterSheetSlot";
import { GameContext } from "../GameProvider";

const PowersList = () => {
  const { cardSlots } = useContext(GameContext);
  return (
    <>
      {Object.values(cardSlots).map((cardSlot, i) => {
        const equippedCards = cardSlot.equipped;
        if (equippedCards.length > 0) {
          return <EquippedCharacterSheetSlot slot={cardSlot} key={i} />;
        }
        return <EmptyCharacterSheetSlot cardSlotMetadata={cardSlot.metadata} key={i} />;
      })}
    </>
  );
};

export default PowersList;
