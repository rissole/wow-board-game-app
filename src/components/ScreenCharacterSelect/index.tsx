import React, { useState } from "react";
import styled from "styled-components";
import { HeroClass } from "../../types";

import paladinIcon from "./paladin.png";
import warlockIcon from "./warlock.png";
import rogueIcon from "./rogue.png";
import mageIcon from "./mage.png";
import hunterIcon from "./hunter.png";
import druidIcon from "./druid.png";
import warriorIcon from "./warrior.png";
import shamanIcon from "./shaman.png";
import priestIcon from "./priest.png";

const CLASSES: HeroClass[] = ["paladin", "warlock", "rogue", "mage", "hunter", "druid", "warrior", "shaman", "priest"];

interface Props {
  onConfirmSelection: () => void;
}

const CharacterSelectScreen = (props: Props) => {
  const [selectedClass, setSelectedClass] = useState<HeroClass | null>(null);

  const heroClassIconMap = {
    paladin: paladinIcon,
    warlock: warlockIcon,
    rogue: rogueIcon,
    mage: mageIcon,
    hunter: hunterIcon,
    druid: druidIcon,
    warrior: warriorIcon,
    shaman: shamanIcon,
    priest: priestIcon,
  };

  const renderClassCards = () => {
    return CLASSES.map((val) => (
      <ClassCard
        isSelected={selectedClass === val}
        onClick={() => (selectedClass === val ? setSelectedClass(null) : setSelectedClass(val))}
        key={val}
        path={heroClassIconMap[val]}
      />
    ));
  };

  return (
    <>
      <div className="main">
        <Grid>{renderClassCards()}</Grid>
      </div>
      <button disabled={!selectedClass} onClick={props.onConfirmSelection}>
        Confirm selection
      </button>
    </>
  );
};

const Grid = styled.div`
  display: grid;
  color: white;
  font-size: 32px;
  width: 100vw;
  height: 50vh;
  padding: 8px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  margin-top: 25vh;
`;

const ClassCard = styled.div<{ isSelected: boolean; path: string }>`
  border: ${(props) => (props.isSelected ? "solid 4px red" : "solid 4px transparent")};
  background-image: url(${(props) => props.path});
  background-repeat: no-repeat;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CharacterSelectScreen;
