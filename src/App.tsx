import React, { useState } from "react";
import "./App.scss";
import { Screen } from "./types";
import ScreenMain from "./components/ScreenMain";
import CharacterSelectScreen from "./components/ScreenCharacterSelect";

function App() {
  // TODO: Change the default value here to "character-select" once fleshed out
  const [screen, setScreen] = useState<Screen>("character-select");

  const renderActiveScreen = () => {
    switch (screen) {
      case "character-select":
        return <CharacterSelectScreen onConfirmSelection={() => setScreen("main")} />;
      case "main":
      default:
        return <ScreenMain />;
    }
  };

  return <div className="app">{renderActiveScreen()}</div>;
}

export default App;
