import React, { useContext, useEffect } from "react";
import "./App.scss";
import { Faction, HeroClass } from "./types";
import ScreenMain from "./components/ScreenMain";
import CharacterSelectScreen from "./components/ScreenCharacterSelect";
import GameProvider, { GameContext } from "./components/GameProvider";

function App() {
  const { screen, changeScreen, updateCharacter, loadSaveState } = useContext(GameContext);

  useEffect(() => {
    requestAnimationFrame(() => {
      const loadedSuccessfully = loadSaveState();
      if (loadedSuccessfully) {
        changeScreen("main");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCharacterSelectConfirm = (faction: Faction, heroClass: HeroClass) => {
    updateCharacter({ faction, heroClass });
    changeScreen("main");
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
