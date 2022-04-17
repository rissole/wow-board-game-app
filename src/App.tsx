import React, {useEffect, useState} from 'react';
import './App.scss';
import EditableStat from "./components/EditableStat";
import CharacterSheetSlot from "./components/CharacterSheetSlot";
import styled from "styled-components";
import CharacterInfoHeader from "./components/CharacterInfoHeader";

interface CharSheetSlot {
    equipped: boolean
}

function App() {
    const [charSheetSlots, setCharSheetSlots] = useState<CharSheetSlot[]>([]);
    useEffect(() => {
        setCharSheetSlots(Array.from({length: 8}).map(_ => ({equipped: false})))
    }, [])
    return (
        <div className="app">
            <div className="topBar">
                <CharacterInfoHeader class='druid' faction='alliance'/>
                <HealthEnergyGoldSection>
                    <EditableStat statName='health' currentValue={10} maxValue={20}/>
                    <EditableStat statName='energy' currentValue={10} maxValue={20}/>
                    <EditableStat statName='gold' currentValue={20}/>
                </HealthEnergyGoldSection>
            </div>
            <div className="main">
                {charSheetSlots.map(charSheetSlot => {
                    return <CharacterSheetSlot equipped={charSheetSlot.equipped}/>
                })}
            </div>
            <div className="nav">
                <div className="spellbook">
                    Spellbook
                </div>
                <div className="reference">
                    Reference
                </div>
                <div className="more">
                    More
                </div>
            </div>
        </div>
    );
}

const CharInfo = styled.div`
  font-size: 18px;
  flex: 0 1 auto;
`

const HealthEnergyGoldSection = styled.div`
  display: flex;
  gap: 8px;
`

export default App;
