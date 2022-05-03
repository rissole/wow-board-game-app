import React from "react";
import { Power } from "../../types";

import CharacterSheetSlot from "../CharacterSheetSlot";

interface Props {
  charSheetSlots: Power[];
}

const PowersList = ({ charSheetSlots }: Props) => {
  return (
    <>
      {charSheetSlots.map((charSheetSlot, i) => {
        return <CharacterSheetSlot power={charSheetSlot} key={i} />;
      })}
    </>
  );
};

export default PowersList;
