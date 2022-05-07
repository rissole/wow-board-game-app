import React from "react";
import { SheetSlot } from "../../types";

import EquippedCharacterSheetSlot from "../EquippedCharacterSheetSlot";
import EmptyCharacterSheetSlot from "../EmptyCharacterSheetSlot";

interface Props {
  charSheetSlots: SheetSlot[];
}

const PowersList = ({ charSheetSlots }: Props) => {
  return (
    <>
      {charSheetSlots.map((charSheetSlot, i) => {
        if (charSheetSlot.slotData) {
          return <EquippedCharacterSheetSlot slot={charSheetSlot} key={i} />;
        }
        return <EmptyCharacterSheetSlot slot={charSheetSlot} key={i} />;
      })}
    </>
  );
};

export default PowersList;
