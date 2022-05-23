import { useCallback, useState } from "react";
import styled from "styled-components";
import { MainScreenList } from "../../types";
import ListPowers from "../ListPowers";
import ListInventory from "../ListInventory";
import ListReference from "../ListReference";
import LayoutHeader from "../LayoutHeader";
import Talents from "./Talents";
import Footer from "./Footer";
import LAYOUT from "../../util/layout";

const MainScreen = () => {
  const [activeList, setActiveList] = useState<MainScreenList>("powers");

  const toggleListBetweenPowersAndInventory = useCallback(
    () => setActiveList((activeList) => (activeList !== "inventory" ? "inventory" : "powers")),
    []
  );

  const renderActiveList = () => {
    switch (activeList) {
      case "reference":
        return <ListReference />;
      case "inventory":
        return <ListInventory />;
      case "powers":
      default:
        return <ListPowers />;
    }
  };

  return (
    <>
      <LayoutHeader activeList={activeList} setActiveList={setActiveList} />
      <MainContainer className="main powers">
        {renderActiveList()}
        <Talents />
      </MainContainer>

      <Footer
        isInventoryOpen={activeList === "inventory"}
        toggleListBetweenPowersAndInventory={toggleListBetweenPowersAndInventory}
      />
    </>
  );
};

export default MainScreen;

const MainContainer = styled.div`
  margin-top: ${LAYOUT.navHeight}px;
  overflow-y: scroll;
`;
