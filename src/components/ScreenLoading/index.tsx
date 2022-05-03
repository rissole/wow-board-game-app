import React, { useEffect } from "react";
import styled from "styled-components";
import { getPowers, getLevelStats } from "../../data-accessor";

const LoadingScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingScreenText = styled.span`
  font-size: 96px;
`;

interface Props {
  onLoadComplete: () => void;
}

const ScreenLoading = ({ onLoadComplete }: Props) => {
  useEffect(() => {
    // TODO: Async load stuff here
    getPowers();
    getLevelStats();

    onLoadComplete();
  }, [onLoadComplete]);

  return (
    <LoadingScreenContainer>
      <LoadingScreenText>Loading...</LoadingScreenText>
    </LoadingScreenContainer>
  );
};

export default ScreenLoading;
