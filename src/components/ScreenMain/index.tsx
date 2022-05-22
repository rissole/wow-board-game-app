import { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { MainScreenList, UniqueCardName } from "../../types";
import useFlipFlop from "../useFlipFlop";
import ClassSpellsCarousel from "../CarouselClassSpells";
import ClassTalentsCarousel from "../CarouselClassTalentsBrowse";
import ListPowers from "../ListPowers";
import ListInventory from "../ListInventory";
import ListReference from "../ListReference";
import { GameContext } from "../GameProvider";
import Talents from "./Talents";
import Footer from "./Footer";
import trainSpellIcon from "./trainSpellIcon.jpg";
import talentsIcon from "./talentsIcon.jpg";
import shopIcon from "./shopIcon.jpg";
import referenceIcon from "./referenceIcon.jpg";

const MainScreen = () => {
  const { addPurchasedCard } = useContext(GameContext);
  const [activeList, setActiveList] = useState<MainScreenList>("powers");

  const { value: isSpellbookModalOpen, toggle: toggleSpellbookModal, setOff: hideSpellbookModal } = useFlipFlop();
  const { value: isTalentModalOpen, toggle: toggleTalentModal, setOff: hideTalentModal } = useFlipFlop();

  const closeSpellbookModal = useCallback(() => {
    hideSpellbookModal();
  }, [hideSpellbookModal]);

  const selectSpellbookItem = useCallback(
    (name: UniqueCardName) => {
      addPurchasedCard(name);
      hideSpellbookModal();
    },
    [addPurchasedCard, hideSpellbookModal]
  );

  const closeTalentModal = useCallback(() => {
    hideTalentModal();
  }, [hideTalentModal]);

  const toggleListBetweenPowersAndInventory = useCallback(
    () => setActiveList((activeList) => (activeList !== "inventory" ? "inventory" : "powers")),
    []
  );

  const toggleListBetweenPowersAndReference = useCallback(
    () => setActiveList((activeList) => (activeList !== "reference" ? "reference" : "powers")),
    []
  );

  const renderActiveList = () => {
    switch (activeList) {
      case "reference":
        return <ListReference />;
      case "inventory":
        return <ListInventory />;
      case "powers":
      default:
        return <ListPowers />;
    }
  };

  interface TopNavItemProps {
    active?: boolean;
    className: string;
    disabled?: boolean;
    iconPath: string;
    label: string;
    onClick?: () => void;
  }

  const TopNavItem = (props: TopNavItemProps) => {
    return (
      <TopNavContainer
        aria-disabled={props.disabled ?? false}
        className={props.className}
        onClick={props.disabled ? undefined : props.onClick}
      >
        <small style={{ fontWeight: props.active ? "700" : "normal" }}>{props.label}</small>
        <TopNavIcon src={props.iconPath} alt="The face of samwise" />
      </TopNavContainer>
    );
  };

  return (
    <>
      <div className="nav">
        <TopNavItem
          className="spellbook"
          iconPath={trainSpellIcon}
          onClick={toggleSpellbookModal}
          label="Train Spells"
        />
        <TopNavItem className="talents" iconPath={talentsIcon} onClick={toggleTalentModal} label="View Talents" />
        <TopNavItem
          className="items"
          iconPath={shopIcon}
          onClick={() => console.log("Items Modal")}
          label="Shop Items"
        />
        <TopNavItem
          active={activeList === "reference"}
          className="more"
          iconPath={referenceIcon}
          onClick={toggleListBetweenPowersAndReference}
          label="Reference"
        />
      </div>
      <div className="main powers">{renderActiveList()}</div>
      <Talents />
      <Footer
        isInventoryOpen={activeList === "inventory"}
        toggleListBetweenPowersAndInventory={toggleListBetweenPowersAndInventory}
      />
      {isSpellbookModalOpen ? (
        <ClassSpellsCarousel onClose={closeSpellbookModal} onSelectItem={selectSpellbookItem} />
      ) : null}
      {isTalentModalOpen ? <ClassTalentsCarousel onClose={closeTalentModal} /> : null}
    </>
  );
};

const TopNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 2px;
  border-bottom: 1px solid #000000;

  &[aria-disabled="true"] {
    filter: grayscale(100%);
  }
`;

const TopNavIcon = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 4px;
`;

export default MainScreen;
