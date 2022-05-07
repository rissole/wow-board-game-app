import React, { useCallback, useContext, useEffect, useState, useMemo } from "react";
import EditableStat from "../EditableStat";
import styled from "styled-components";
import CharacterInfoHeader from "../CharacterInfoHeader";
import { CharacterLevel, StatType, MainScreenList, CharacterSheetSlot, CardId } from "../../types";
import useFlipFlop from "../useFlipFlop";
import SpellbookCarousel from "../SpellbookCarousel";
import ListPowers from "../ListPowers";
import ListInventory from "../ListInventory";
import ListReference from "../ListReference";
import { GameContext } from "../GameProvider";
import { powers, slots, statsForLevel } from "../../data-accessor";
import TheFace from "../../assets/samwise.png";

const MainScreen = () => {
  const { character, updateCharacter, addPower } = useContext(GameContext);
  const [activeList, setActiveList] = useState<MainScreenList>("powers");
  const [charSheetSlots, setCharSheetSlots] = useState<CharacterSheetSlot[]>([]);

  const { value: isSpellbookModalOpen, toggle: toggleSpellbookModal, setOff: hideSpellbookModal } = useFlipFlop();
  const statsForCurrentLevel = useMemo(() => statsForLevel(character.level), [character]);

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

  const generateStatChangeHandler = useCallback(
    (statType: StatType) => {
      return (newCurrentValue: number) => {
        // TODO: I think some items make it possible to go above your max class value, we may need to support this
        updateCharacter({
          [statType]: newCurrentValue,
        });
      };
    },
    [updateCharacter]
  );

  // TODO: Rework the level up experience so that users don't accidentally lose their current health/energy stats
  // Currently we update your stats immediately once you modify your level in the modal
  const updateCharacterLevel = useCallback(
    (newLevel: CharacterLevel) => {
      const newStats = statsForLevel(newLevel);
      updateCharacter({
        level: newLevel,
        health: newStats.health,
        energy: newStats.energy,
      });
    },
    [updateCharacter]
  );

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
      <h3>
        {character.faction} {character.heroClass}
      </h3>
      <div className="statsSection">
        <CharacterInfoHeader
          class={character.heroClass}
          faction={character.faction}
          level={character.level}
          setLevel={updateCharacterLevel}
        />
        <HealthEnergyGoldSection>
          <EditableStat
            statName="health"
            currentValue={character.health}
            maxValue={statsForCurrentLevel.health}
            onStatChange={generateStatChangeHandler("health")}
          />
          <EditableStat
            statName="energy"
            currentValue={character.energy}
            maxValue={statsForCurrentLevel.energy}
            onStatChange={generateStatChangeHandler("energy")}
          />
          <EditableStat
            statName="gold"
            currentValue={character.gold}
            onStatChange={generateStatChangeHandler("gold")}
          />
        </HealthEnergyGoldSection>
      </div>
      {isSpellbookModalOpen ? <SpellbookCarousel onClose={closeNavModal} onSelectItem={selectSpellbookItem} /> : null}
    </>
  );
};

const HealthEnergyGoldSection = styled.div`
  display: flex;
  gap: 8px;
`;

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
