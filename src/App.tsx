import React from 'react';
import './App.scss';
import EditableStat from "./components/EditableStat";

function App() {
    return (
        <div className="app">
            <div className="topBar">
                <div className="charInfo">
                    Soldy Doldyy
                </div>
                <div className="healthEnergyGoldSection">
                    <EditableStat statName='health' currentValue={0}/>
                    <EditableStat statName='energy' currentValue={0}/>
                    <EditableStat statName='gold' currentValue={0}/>
                </div>
            </div>
            <div className="main">
                a
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
