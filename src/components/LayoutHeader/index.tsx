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

interface Props {
  activeList: MainScreenList;
  setActiveList: (list: MainScreenList) => void;
}

const Header = ({ activeList, setActiveList }: Props) => {
  const { addPurchasedCard } = useContext(GameContext);
  const { value: isSpellbookModalOpen, toggle: toggleSpellbookModal, setOff: hideSpellbookModal } = useFlipFlop();
  const { value: isTalentModalOpen, toggle: toggleTalentModal, setOff: hideTalentModal } = useFlipFlop();

  const selectSpellbookItem = useCallback(
    (name: UniqueCardName) => {
      addPurchasedCard(name);
      hideSpellbookModal();
    },
    [addPurchasedCard, hideSpellbookModal]
  );

  const toggleListBetweenPowersAndReference = useCallback(
    () => setActiveList(activeList !== "reference" ? "reference" : "powers"),
    [activeList, setActiveList]
  );

  return (
    <>
      <NavContainer className="nav">
        <TopNavItem
          className="spellbook"
          iconPath={trainSpellIcon}
          onClick={toggleSpellbookModal}
          label="Train Spells"
        />
        <TopNavItem className="talents" iconPath={talentsIcon} onClick={toggleTalentModal} label="Learn Talents" />
        <TopNavItem
          className="items"
          iconPath={shopIcon}
          onClick={() => console.log("Items Modal")}
          label="Buy Items"
        />
        <TopNavItem
          active={activeList === "reference"}
          className="more"
          iconPath={referenceIcon}
          onClick={toggleListBetweenPowersAndReference}
          label="Reference"
        />
      </NavContainer>
      {isSpellbookModalOpen ? (
        <ClassSpellsCarousel onClose={hideSpellbookModal} onSelect={selectSpellbookItem} />
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
