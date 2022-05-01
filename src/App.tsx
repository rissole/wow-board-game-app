import React, { useCallback, useEffect, useState } from "react";
import "./App.scss";
import EditableStat from "./components/EditableStat";
import CharacterSheetSlot from "./components/CharacterSheetSlot";
import styled from "styled-components";
import CharacterInfoHeader from "./components/CharacterInfoHeader";
import { CharacterLevel, CharacterStats, StatType } from "./types";
import useFlipFlop from "./components/useFlipFlop";
import Modal from "./components/Modal";
import SpellbookCarousel from "./components/SpellbookCarousel";

interface CharSheetSlot {
  equipped: boolean;
}

function App() {
  const [charSheetSlots, setCharSheetSlots] = useState<CharSheetSlot[]>([]);
  useEffect(() => {
    setCharSheetSlots(Array.from({ length: 8 }).map((_) => ({ equipped: false })));
  }, []);

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

  return (
    <div className="app">
      <div className="nav">
        <div className="spellbook" onClick={toggleSpellbookModal}>
          Spellbook
        </div>
        <div className="inventory">Inventory</div>
        <div className="more">More</div>
      </div>
      <div className="main">
        {charSheetSlots.map((charSheetSlot, i) => {
          return <CharacterSheetSlot equipped={charSheetSlot.equipped} key={i} />;
        })}
      </div>
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
      {isSpellbookModalOpen ? (
        <Modal onClose={closeNavModal}>
          <SpellbookCarousel />
        </Modal>
      ) : null}
    </div>
  );
}

const HealthEnergyGoldSection = styled.div`
  display: flex;
  gap: 8px;
`;

export default App;
