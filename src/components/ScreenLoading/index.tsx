import React, { useEffect } from "react";
import styled from "styled-components";
import { CharacterLevel, DiceColour, HeroClass, Phase, Power, PowerType, GameData } from "../../types";

import powersJson from "../../powers.csv";

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
  onLoadComplete: (data: GameData) => void;
}

function parseCsvToPower(csv: ReadonlyArray<ReadonlyArray<string | number | null>>): Power[] {
  return csv.map((row) => ({
    name: row[0] as string,
    class: row[1] as HeroClass,
    type: row[2] as PowerType,
    requiredLevel: row[3] as CharacterLevel,
    goldCost: row[4] as number,
    energyCost: row[5] as number,
    rawDescription: row[6] as string,
    iconLink: row[7] as string,
    phase: row[8] as Phase,
    dependantOn: row[9] === null ? undefined : (row[9] as string).split(", "),
    attributesImpacted: (row[10] as string).split(", "),
    effect: row[11] as string,
    spotColour: row[12] === null ? undefined : (row[12] as string).split(", ").map((item) => item as DiceColour),
    spotAmount: row[13] === null ? undefined : (row[13] as string),
    maxSpotAmount: row[14] === null ? undefined : (row[14] as number),
  }));
}

const ScreenLoading = ({ onLoadComplete }: Props) => {
  useEffect(() => {
    // Do your async load here
    const powers = parseCsvToPower(powersJson.slice(1));
    const loadedData = {
      powers,
    };
    onLoadComplete(loadedData);
  }, [onLoadComplete]);

  return (
    <LoadingScreenContainer>
      <LoadingScreenText>Loading...</LoadingScreenText>
    </LoadingScreenContainer>
  );
};

export default ScreenLoading;
