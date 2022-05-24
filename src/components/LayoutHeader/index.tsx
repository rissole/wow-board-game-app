import { useCallback, useContext } from "react";
import styled from "styled-components";

import { GameContext } from "../GameProvider";
import ClassSpellsCarousel from "../CarouselClassSpells";
import ClassTalentsCarousel from "../CarouselClassTalentsBrowse";
import TopNavItem from "./TopNavItem";
import useFlipFlop from "../useFlipFlop";

import { MainScreenList, UniqueCardName } from "../../types";
import LAYOUT from "../../util/layout";

import trainSpellIcon from "./trainSpellIcon.jpg";
import talentsIcon from "./talentsIcon.jpg";
import shopIcon from "./shopIcon.jpg";
import referenceIcon from "./referenceIcon.jpg";
import { ValidatedSelectedItem } from "../Carousel";
import { getPowerByName } from "../../data-accessor";

interface Props {
  activeList: MainScreenList;
  setActiveList: (list: MainScreenList) => void;
}

const Header = ({ activeList, setActiveList }: Props) => {
  const { purchaseCard, character } = useContext(GameContext);
  const { value: isSpellbookModalOpen, toggle: toggleSpellbookModal, setOff: hideSpellbookModal } = useFlipFlop();
  const { value: isTalentModalOpen, toggle: toggleTalentModal, setOff: hideTalentModal } = useFlipFlop();

  const selectSpellbookItem = useCallback(
    (name: UniqueCardName) => {
      purchaseCard(name);
      hideSpellbookModal();
    },
    [purchaseCard, hideSpellbookModal]
  );

  const canTrainSpellbookItem = useCallback(
    (name: UniqueCardName): ValidatedSelectedItem => {
      const power = getPowerByName(name);
      return {
        canSelect: character.gold >= power.goldCost,
        errorMessage: "Not enough gold to train spell!",
      };
    },
    [character.gold]
  );

  const toggleListBetweenPowersAndReference = useCallback(
    () => setActiveList(activeList !== "reference" ? "reference" : "powers"),
    [activeList, setActiveList]
  );

  return (
    <>
      <NavContainer className="nav">
        <TopNavItem className="spellbook" iconPath={trainSpellIcon} onClick={toggleSpellbookModal} label="Spells" />
        <TopNavItem className="talents" iconPath={talentsIcon} onClick={toggleTalentModal} label="Talents" />
        <TopNavItem className="items" iconPath={shopIcon} onClick={() => console.log("Items Modal")} label="Items" />
        <TopNavItem
          active={activeList === "reference"}
          className="more"
          iconPath={referenceIcon}
          onClick={toggleListBetweenPowersAndReference}
          label="Info"
        />
      </NavContainer>
      {isSpellbookModalOpen ? (
        <ClassSpellsCarousel
          onClose={hideSpellbookModal}
          onSelectItem={selectSpellbookItem}
          canTrainSpell={canTrainSpellbookItem}
        />
      ) : null}
      {isTalentModalOpen ? <ClassTalentsCarousel onClose={hideTalentModal} /> : null}
    </>
  );
};

export default Header;

// Top nav bar is locked to top of screen
const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  width: 100%;
  position: fixed;
  top: 0;
  height: ${LAYOUT.navHeight}px;
`;
