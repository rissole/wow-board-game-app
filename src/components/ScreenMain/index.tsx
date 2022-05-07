import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MainScreenList, CharacterSheetSlot, CardId } from "../../types";
import useFlipFlop from "../useFlipFlop";
import SpellbookCarousel from "../SpellbookCarousel";
import ListPowers from "../ListPowers";
import ListInventory from "../ListInventory";
import ListReference from "../ListReference";
import { GameContext } from "../GameProvider";
import { powers } from "../../data-accessor";
import TheFace from "../../assets/samwise.png";
import Talents from "./Talents";
import Footer from "./Footer";

const MainScreen = () => {
  const { addPower } = useContext(GameContext);
  const [activeList, setActiveList] = useState<MainScreenList>("powers");
  const [charSheetSlots, setCharSheetSlots] = useState<CharacterSheetSlot[]>([]);

  const { value: isSpellbookModalOpen, toggle: toggleSpellbookModal, setOff: hideSpellbookModal } = useFlipFlop();

  useEffect(() => {
    setCharSheetSlots(
      Array.from({ length: 8 }).map((_, index) => {
        const power = powers[index];
        return {
          slotTypes: [power.type],
          name: power.name,
          // This needs to be changed and renamed as this will also be where pet health metadata is stored
          energyCost: power.type === "instant" ? power.energyCost : 0,
          iconLink: power.iconLink,
          attributesImpacted: power.attributesImpacted,
        };
      })
    );
  }, []);

  const closeNavModal = useCallback(() => {
    hideSpellbookModal();
  }, [hideSpellbookModal]);

  const selectSpellbookItem = useCallback(
    (id: CardId) => {
      addPower(id);
      hideSpellbookModal();
    },
    [addPower, hideSpellbookModal]
  );

  const toggleScreen = useCallback(() => {
    let newActiveList: MainScreenList = "powers";
    if (activeList === "powers") {
      newActiveList = "inventory";
    }
    setActiveList(newActiveList);
  }, [activeList]);

  const renderActiveList = () => {
    switch (activeList) {
      case "reference":
        return <ListReference />;
      case "inventory":
        return <ListInventory />;
      case "powers":
      default:
        return <ListPowers charSheetSlots={charSheetSlots} />;
    }
  };

  interface TopNavItemProps {
    className: string;
    onClick?: () => void;
    displayName: string;
  }

  const TopNavItem = (props: TopNavItemProps) => {
    return (
      <TopNavContainer className={props.className} onClick={props.onClick}>
        {props.displayName}
        <TopNavIcon src={TheFace} alt="The face of samwise" />
      </TopNavContainer>
    );
  };

  return (
    <>
      <div className="nav">
        <TopNavItem className="spellbook" onClick={toggleSpellbookModal} displayName="Class Spells" />
        <TopNavItem className="talents" onClick={() => console.log("Talents Modal")} displayName="View Talents" />
        <TopNavItem
          className="inventory"
          onClick={toggleScreen}
          displayName={activeList !== "powers" ? "Powers" : "Items"}
        />
        <TopNavItem className="more" onClick={() => setActiveList("reference")} displayName="Reference" />
      </div>
      <div className="main">{renderActiveList()}</div>
      <Talents />
      <Footer />
      {isSpellbookModalOpen ? <SpellbookCarousel onClose={closeNavModal} onSelectItem={selectSpellbookItem} /> : null}
    </>
  );
};

const TopNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopNavIcon = styled.img`
  height: 48px;
  width: 48px;
`;

export default MainScreen;
