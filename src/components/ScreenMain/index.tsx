import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MainScreenList, SheetSlot, CardId } from "../../types";
import useFlipFlop from "../useFlipFlop";
import SpellbookCarousel from "../SpellbookCarousel";
import ListPowers from "../ListPowers";
import ListInventory from "../ListInventory";
import ListReference from "../ListReference";
import { GameContext } from "../GameProvider";
import { powers, slots } from "../../data-accessor";
import TheFace from "../../assets/samwise.png";
import Talents from "./Talents";
import Footer from "./Footer";

const MainScreen = () => {
  const { addPower } = useContext(GameContext);
  const [activeList, setActiveList] = useState<MainScreenList>("powers");
  const [charSheetSlots, setCharSheetSlots] = useState<SheetSlot[]>([]);

  const { value: isSpellbookModalOpen, toggle: toggleSpellbookModal, setOff: hideSpellbookModal } = useFlipFlop();

  useEffect(() => {
    setCharSheetSlots(
      Array.from({ length: 8 }).map((_, index) => {
        const power = powers[index];
        const slot = slots[index];
        return {
          ...slot,
          slotData: slot.slotTypes.some(
            (value) => value.primary === power.type.primary && value.secondary === power.type.secondary
          )
            ? {
                slotTypes: [power.type],
                name: power.name,
                // This needs to be changed and renamed as this will also be where pet health metadata is stored
                energyCost: power.type.primary === "instant" ? power.energyCost : 0,
                iconLink: power.iconLink,
                attributesImpacted: power.attributesImpacted,
              }
            : undefined,
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
      <div className="main powers">{renderActiveList()}</div>
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
