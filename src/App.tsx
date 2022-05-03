import React, { useState } from "react";
import "./App.scss";
import { Screen } from "./types";
import ScreenMain from "./components/ScreenMain";

function App() {
  const [screen] = useState<Screen>("main");

  const renderActiveScreen = () => {
    switch (screen) {
      case "main":
      default:
        return <ScreenMain />;
    }
  };

  return <div className="app">{renderActiveScreen()}</div>;
}

export default App;
