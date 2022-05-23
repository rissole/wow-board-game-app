import { useCallback, useState } from "react";
import styled from "styled-components";
import { MainScreenList } from "../../types";
import ListPowers from "../ListPowers";
import ListInventory from "../ListInventory";
import ListReference from "../ListReference";
import LayoutHeader from "../LayoutHeader";
import Footer from "../LayoutFooter";
import Talents from "./Talents";
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
      <MainContainer>
        <ListContainer>{renderActiveList()}</ListContainer>
        {activeList === "powers" && <Talents />}
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
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  margin-top: ${LAYOUT.navHeight}px;
  margin-bottom: ${LAYOUT.footerHeight}px;
  overflow-y: auto;
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  align-content: start;
`;
