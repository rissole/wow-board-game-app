import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MainScreenList, SheetSlot, CardId } from "../../types";
import useFlipFlop from "../useFlipFlop";
import ClassSpellsCarousel from "../CarouselClassSpells";
import ClassTalentsCarousel from "../CarouselClassTalentsBrowse";
import ListPowers from "../ListPowers";
import ListInventory from "../ListInventory";
import ListReference from "../ListReference";
import { GameContext } from "../GameProvider";
import { powers, slots } from "../../data-accessor";
import Talents from "./Talents";
import Footer from "./Footer";
import trainSpellIcon from "./trainSpellIcon.jpg";
import talentsIcon from "./talentsIcon.jpg";
import shopIcon from "./shopIcon.jpg";
import referenceIcon from "./referenceIcon.jpg";

const MainScreen = () => {
  const { addPower } = useContext(GameContext);
  const [activeList, setActiveList] = useState<MainScreenList>("powers");
  const [charSheetSlots, setCharSheetSlots] = useState<SheetSlot[]>([]);

  const { value: isSpellbookModalOpen, toggle: toggleSpellbookModal, setOff: hideSpellbookModal } = useFlipFlop();
  const { value: isTalentModalOpen, toggle: toggleTalentModal, setOff: hideTalentModal } = useFlipFlop();

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

  const closeSpellbookModal = useCallback(() => {
    hideSpellbookModal();
  }, [hideSpellbookModal]);

  const selectSpellbookItem = useCallback(
    (id: CardId) => {
      addPower(id);
      hideSpellbookModal();
    },
    [addPower, hideSpellbookModal]
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
        return <ListPowers charSheetSlots={charSheetSlots} />;
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
      <Footer toggleListBetweenPowersAndInventory={toggleListBetweenPowersAndInventory} />
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
