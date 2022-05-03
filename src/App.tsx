import React, { useCallback, useState } from "react";
import "./App.scss";
import { GameData, Screen } from "./types";
import ScreenLoading from "./components/ScreenLoading";
import ScreenMain, { Data } from "./components/ScreenMain";

function App() {
  const [screen, setScreen] = useState<Screen>("loading");
  const [data, setData] = useState<Data>({ powers: [] });

  const onLoadComplete = useCallback((data: GameData) => {
    setData(data);
    setScreen("main");
  }, []);

  const renderActiveScreen = () => {
    switch (screen) {
      case "loading":
        return <ScreenLoading onLoadComplete={onLoadComplete} />;
      case "main":
      default:
        return <ScreenMain data={data} />;
    }
  };

  return <div className="app">{renderActiveScreen()}</div>;
}

export default App;
