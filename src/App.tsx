import React, { useCallback, useState } from "react";
import "./App.scss";
import { Screen } from "./types";
import ScreenLoading from "./components/ScreenLoading";
import ScreenMain from "./components/ScreenMain";

function App() {
  const [screen, setScreen] = useState<Screen>("loading");

  const onLoadComplete = useCallback(() => {
    setScreen("main");
  }, []);

  const renderActiveScreen = () => {
    switch (screen) {
      case "loading":
        return <ScreenLoading onLoadComplete={onLoadComplete} />;
      case "main":
      default:
        return <ScreenMain />;
    }
  };

  return <div className="app">{renderActiveScreen()}</div>;
}

export default App;
