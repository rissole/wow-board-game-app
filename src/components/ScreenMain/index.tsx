import React, { useCallback, useEffect, useState } from "react";
import EditableStat from "../EditableStat";
import styled from "styled-components";
import CharacterInfoHeader from "../CharacterInfoHeader";
import { CharacterLevel, CharacterStats, StatType, List, CharacterSheetSlot } from "../../types";
import useFlipFlop from "../useFlipFlop";
import SpellbookCarousel from "../SpellbookCarousel";
import ListPowers from "../ListPowers";
import ListInventory from "../ListInventory";
import { powers, statsForLevel } from "../../data-accessor";

const MainScreen = () => {
  const [activeList, setActiveList] = useState<List>("powers");
  const [charSheetSlots, setCharSheetSlots] = useState<CharacterSheetSlot[]>([]);

  const { value: isSpellbookModalOpen, toggle: toggleSpellbookModal, setOff: hideSpellbookModal } = useFlipFlop();

  const [characterLevel, setCharacterLevel] = useState<CharacterLevel>(1);
  const [characterStats, setCharacterStats] = useState<CharacterStats>({
    health: {
      current: statsForLevel(characterLevel).health,
      max: statsForLevel(characterLevel).health,
    },
    energy: {
      current: statsForLevel(characterLevel).energy,
      max: statsForLevel(characterLevel).energy,
    },
    gold: {
      current: 10,
    },
  });

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

  const generateStatChangeHandler = useCallback((statType: StatType) => {
    return (newCurrentValue: number, newMaxCurrentValue?: number) => {
      setCharacterStats((oldStats) => ({
        ...oldStats,
        [statType]: {
          current: newCurrentValue,
          ...(newMaxCurrentValue !== undefined ? { max: newMaxCurrentValue } : {}),
        },
      }));
    };
  }, []);

  const updateCharacterLevel = useCallback((newLevel: CharacterLevel) => {
    setCharacterLevel(newLevel);
    setCharacterStats((oldStats) => ({
      ...oldStats,
      health: {
        current: statsForLevel(newLevel).health,
        max: statsForLevel(newLevel).health,
      },
      energy: {
        current: statsForLevel(newLevel).energy,
        max: statsForLevel(newLevel).energy,
      },
    }));
  }, []);

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
      <div className="statsSection">
        <CharacterInfoHeader class="druid" faction="alliance" level={characterLevel} setLevel={updateCharacterLevel} />
        <HealthEnergyGoldSection>
          <EditableStat
            statName="health"
            currentValue={characterStats.health.current}
            maxValue={characterStats.health.max}
            onStatChange={generateStatChangeHandler("health")}
          />
          <EditableStat
            statName="energy"
            currentValue={characterStats.energy.current}
            maxValue={characterStats.energy.max}
            onStatChange={generateStatChangeHandler("energy")}
          />
          <EditableStat
            statName="gold"
            currentValue={characterStats.gold.current}
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
