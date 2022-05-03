import React, { useCallback, useEffect, useState } from "react";
import EditableStat from "../EditableStat";
import styled from "styled-components";
import CharacterInfoHeader from "../CharacterInfoHeader";
import { CharacterLevel, CharacterStats, Power, StatType, List } from "../../types";
import useFlipFlop from "../useFlipFlop";
import SpellbookCarousel from "../SpellbookCarousel";
import ListPowers from "../ListPowers";
import ListInventory from "../ListInventory";

export interface Data {
  powers: Power[];
}

interface Props {
  data: Data;
}

const MainScreen = ({ data }: Props) => {
  const [activeList, setActiveList] = useState<List>("powers");
  const [_, setPowers] = useState<Power[]>([]);
  const [charSheetSlots, setCharSheetSlots] = useState<Power[]>([]);

  const { value: isSpellbookModalOpen, toggle: toggleSpellbookModal, setOff: hideSpellbookModal } = useFlipFlop();

  const [characterLevel, setCharacterLevel] = useState<CharacterLevel>(1);
  const [characterStats, setCharacterStats] = useState<CharacterStats>({
    health: {
      current: 10,
      max: 20,
    },
    energy: {
      current: 10,
      max: 20,
    },
    gold: {
      current: 10,
    },
  });

  useEffect(() => {
    const { powers } = data;
    setPowers(powers);
    setCharSheetSlots(Array.from({ length: 8 }).map((_, index) => powers[index]));
  }, [data]);

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

  const closeNavModal = useCallback(() => {
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
        <CharacterInfoHeader class="druid" faction="alliance" level={characterLevel} setLevel={setCharacterLevel} />
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
      {isSpellbookModalOpen ? <SpellbookCarousel onClose={closeNavModal} /> : null}
    </>
  );
};

const HealthEnergyGoldSection = styled.div`
  display: flex;
  gap: 8px;
`;

export default MainScreen;
