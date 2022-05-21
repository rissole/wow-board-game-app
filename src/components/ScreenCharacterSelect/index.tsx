import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { Faction, HeroClass } from "../../types";

import allianceCircle from "./alliance-circle.png";
import hordeCircle from "./horde-circle.png";

import paladinIcon from "./paladin.png";
import warlockIcon from "./warlock.png";
import rogueIcon from "./rogue.png";
import mageIcon from "./mage.png";
import hunterIcon from "./hunter.png";
import druidIcon from "./druid.png";
import warriorIcon from "./warrior.png";
import shamanIcon from "./shaman.png";
import priestIcon from "./priest.png";
import CheckMark from "./CheckMarkIcon";
import COLORS from "../../util/colors";

const CLASSES: HeroClass[] = ["paladin", "warlock", "rogue", "mage", "hunter", "druid", "warrior", "shaman", "priest"];

interface Props {
  onConfirmSelection: (faction: Faction, heroClass: HeroClass) => void;
}

const CharacterSelectScreen = (props: Props) => {
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(null);
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
        isDisabled={
          !selectedFaction ||
          (selectedFaction === "horde" && val === "paladin") ||
          (selectedFaction === "alliance" && val === "shaman")
        }
        onClick={() => (selectedClass === val ? setSelectedClass(null) : setSelectedClass(val))}
        key={val}
        path={heroClassIconMap[val]}
      />
    ));
  };

  const handleConfirm = () => {
    if (selectedFaction && selectedClass) {
      props.onConfirmSelection(selectedFaction, selectedClass);
    }
  };

  return (
    <>
      <div className="main">
        <FactionGrid>
          <FactionCard
            isSelected={selectedFaction === "alliance"}
            borderColor={COLORS.alliance}
            path={allianceCircle}
            onClick={() => {
              if (selectedClass === "shaman") {
                setSelectedClass(null);
              }
              setSelectedFaction("alliance");
            }}
          />
          <FactionCard
            isSelected={selectedFaction === "horde"}
            borderColor={COLORS.horde}
            path={hordeCircle}
            onClick={() => {
              if (selectedClass === "paladin") {
                setSelectedClass(null);
              }

              setSelectedFaction("horde");
            }}
          />
        </FactionGrid>
        <Grid>{renderClassCards()}</Grid>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            flex: "1 0 auto",
            flexFlow: "column nowrap",
          }}
        >
          <ConfirmSelectionButton disabled={!selectedClass || !selectedFaction} onClick={handleConfirm} />
        </div>
      </div>
    </>
  );
};

const FactionGrid = styled.div`
  padding: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  width: 100vw;
  height: 25vh;
`;

const FactionCard = styled.div<{ isSelected: boolean; borderColor: string; path: string }>`
  display: flex;
  background-image: url(${(props) => props.path});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: ${(props) => (props.isSelected ? `solid 4px ${props.borderColor}` : "solid 4px transparent")};
  cursor: pointer;
  border-radius: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  width: min(100vw, 390px);
  height: min(100vw, 390px);
  padding: 8px;
  margin: 0 auto;
  gap: 4px;
`;

const ClassCard = styled.div<{ isSelected: boolean; isDisabled: boolean; path: string }>`
  pointer-events: ${(props) => (props.isDisabled ? "none" : undefined)};
  opacity: ${(props) => (props.isDisabled ? "20%" : undefined)};
  background-image: url(${(props) => props.path});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: ${(props) => (props.isSelected ? "solid 4px gold" : "solid 4px black")};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
`;

/**
 * as much as we'd like this to be a button, some in-built
 * iOS safari styles make a real button too hard to deal with
 */
const ConfirmSelectionButtonInner = styled.div`
  border: solid 3px gold;
  font-size: 72px;
  background-color: ${COLORS.background};
  height: 96px;
  width: 96px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;

  &[aria-disabled="true"] {
    filter: grayscale(100%);
    opacity: 10%;
  }
`;

const ConfirmSelectionButton = (props: { disabled: boolean; children?: ReactNode; onClick?: () => void }) => (
  <ConfirmSelectionButtonInner role="button" aria-disabled={props.disabled} {...props}>
    <CheckMark color="gold" size="64px" />
  </ConfirmSelectionButtonInner>
);

export default CharacterSelectScreen;
