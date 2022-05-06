import React, { useContext } from "react";
import { GameContext } from "../GameProvider";
import CharacterSheetSlot from "../CharacterSheetSlot";

const PowersList = () => {
  const { powers } = useContext(GameContext);

  return (
    <>
      {powers.map((power, i) => {
        return <CharacterSheetSlot power={power} key={i} />;
      })}
    </>
  );
};

export default PowersList;
