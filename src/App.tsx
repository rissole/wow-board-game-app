import React, { useContext, useState } from "react";
import "./App.scss";
import { Screen, Faction, HeroClass } from "./types";
import ScreenMain from "./components/ScreenMain";
import CharacterSelectScreen from "./components/ScreenCharacterSelect";
import GameProvider, { GameContext } from "./components/GameProvider";

function App() {
  const [screen, setScreen] = useState<Screen>("character-select");
  const { updateCharacter } = useContext(GameContext);

  const handleCharacterSelectConfirm = (faction: Faction, heroClass: HeroClass) => {
    updateCharacter({ faction, heroClass });
    setScreen("main");
  };

  const renderActiveScreen = () => {
    switch (screen) {
      case "character-select":
        return <CharacterSelectScreen onConfirmSelection={handleCharacterSelectConfirm} />;
      case "main":
      default:
        return <ScreenMain />;
    }
  };

  return <div className="app">{renderActiveScreen()}</div>;
}

const AppWithProvider = () => (
  <GameProvider>
    <App />
  </GameProvider>
);

export default AppWithProvider;
