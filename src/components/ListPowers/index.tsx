import React from "react";
import { CharacterSheetSlot } from "../../types";

import EquippedCharacterSheetSlot from "../EquippedCharacterSheetSlot";

interface Props {
  charSheetSlots: CharacterSheetSlot[];
}

const PowersList = ({ charSheetSlots }: Props) => {
  return (
    <>
      {charSheetSlots.map((charSheetSlot, i) => {
        return <EquippedCharacterSheetSlot slot={charSheetSlot} key={i} />;
      })}
    </>
  );
};

export default PowersList;
