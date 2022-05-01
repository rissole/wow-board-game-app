import React, { useCallback, useEffect, useState } from "react";
import "./App.scss";
import EditableStat from "./components/EditableStat";
import styled from "styled-components";
import CharacterInfoHeader from "./components/CharacterInfoHeader";
import { CharacterLevel, CharacterStats, DiceColour, HeroClass, Phase, Power, PowerType, StatType } from "./types";
import useFlipFlop from "./components/useFlipFlop";
import SpellbookCarousel from "./components/SpellbookCarousel";
import powersJson from "./powers.csv";
import CharacterSheetSlot from "./components/CharacterSheetSlot";

function parseCsvToPower(csv: ReadonlyArray<ReadonlyArray<string | number | null>>): Power[] {
  return csv.map((row) => {
    return {
      name: row[0] as string,
      class: row[1] as HeroClass,
      type: row[2] as PowerType,
      requiredLevel: row[3] as CharacterLevel,
      goldCost: row[4] as number,
      energyCost: row[5] as number,
      rawDescription: row[6] as string,
      iconLink: row[7] as string,
      phase: row[8] as Phase,
      dependantOn: row[9] === null ? undefined : (row[9] as string).split(", "),
      attributesImpacted: (row[10] as string).split(", "),
      effect: row[11] as string,
      spotColour: row[12] === null ? undefined : (row[12] as string).split(", ").map((item) => item as DiceColour),
      spotAmount: row[13] === null ? undefined : (row[13] as string),
      maxSpotAmount: row[14] === null ? undefined : (row[14] as number),
    };
  });
}

function App() {
  const powers = parseCsvToPower(powersJson.slice(1));
  const [charSheetSlots, setCharSheetSlots] = useState<Power[]>([]);
  useEffect(() => {
    setCharSheetSlots(Array.from({ length: 8 }).map((_, index) => powers[index]));
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
          return <CharacterSheetSlot power={charSheetSlot} key={i} />;
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
      {isSpellbookModalOpen ? <SpellbookCarousel onClose={closeNavModal} /> : null}
    </div>
  );
}

const HealthEnergyGoldSection = styled.div`
  display: flex;
  gap: 8px;
`;

export default App;
