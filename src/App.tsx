import React, {useEffect, useState} from 'react';
import './App.scss';
import EditableStat from "./components/EditableStat";
import CharacterSheetSlot from "./components/CharacterSheetSlot";

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
                <div className="charInfo">
                    Soldy Doldyy
                </div>
                <div className="healthEnergyGoldSection">
                    <EditableStat statName='health' currentValue={0} maxValue={3}/>
                    <EditableStat statName='energy' currentValue={0} maxValue={5}/>
                    <EditableStat statName='gold' currentValue={0}/>
                </div>
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

export default App;
