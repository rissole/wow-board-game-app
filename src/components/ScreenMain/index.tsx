import React, { useCallback, useContext, useEffect, useState, useMemo } from "react";
import EditableStat from "../EditableStat";
import styled from "styled-components";
import CharacterInfoHeader from "../CharacterInfoHeader";
import { CharacterLevel, StatType, MainScreenList, CharacterSheetSlot } from "../../types";
import useFlipFlop from "../useFlipFlop";
import SpellbookCarousel from "../SpellbookCarousel";
import ListPowers from "../ListPowers";
import ListInventory from "../ListInventory";
import { GameContext } from "../GameProvider";
import { powers, statsForLevel } from "../../data-accessor";

const MainScreen = () => {
  const { character, updateCharacter } = useContext(GameContext);
  const [activeList, setActiveList] = useState<MainScreenList>("powers");
  const [charSheetSlots, setCharSheetSlots] = useState<CharacterSheetSlot[]>([]);

  const { value: isSpellbookModalOpen, toggle: toggleSpellbookModal, setOff: hideSpellbookModal } = useFlipFlop();
  const statsForCurrentLevel = useMemo(() => statsForLevel(character.level), [character]);

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

  const selectSpellbookItem = useCallback(() => {
    hideSpellbookModal();
  }, [hideSpellbookModal]);

  const toggleScreen = useCallback(() => {
    setActiveList(activeList === "powers" ? "inventory" : "powers");
  }, [activeList]);

  const renderActiveList = () => {
    switch (activeList) {
      case "inventory":
        return <ListInventory />;
      case "powers":
      default:
        return <ListPowers charSheetSlots={charSheetSlots} />;
    }
  };

  return (
    <>
      <div className="nav">
        <div className="spellbook" onClick={toggleSpellbookModal}>
          Spellbook
        </div>
        <div className="inventory" onClick={toggleScreen}>
          {activeList === "powers" ? "Inventory" : "Powers"}
        </div>
        <div className="more">More</div>
      </div>
      <div className="main">{renderActiveList()}</div>
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

export default MainScreen;
