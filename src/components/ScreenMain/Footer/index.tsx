import { useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import EditableStat from "../../EditableStat";
import { statsForLevel } from "../../../data-accessor";
import { GameContext } from "../../GameProvider";
import ToggleIcon from "./backpack.png";
import FactionText from "./FactionText";
import ClassText from "./ClassText";
import Modal from "../../Modal";
import useFlipFlop from "../../useFlipFlop";
import { StatType } from "../../../types";
import CharacterConfigModalContent from "../CharacterConfigModalContent";

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;
  padding: 4px;
`;

const CharacterSection = styled.div`
  display: flex;
  flex-flow: row no-wrap;
  justify-content: center;
  padding: 8px;
  gap: 16px;
  align-items: center;
  font-size: 20px;
  color: white;
`;

const StatSection = styled.div`
  display: flex;
  flex-flow: row no-wrap;
  justify-content: center;
  gap: 8px;
  align-items: center;
`;

const ToggleListSection = styled.div`
  padding-left: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleListButton = styled.img`
  width: 64px;
  height: 64px;
  padding: 4px;
  border-radius: 20px;
  border: 2px solid green;
  background-color: #000;
`;

const LevelText = styled.span`
  font-weight: bold;
`;

interface Props {
  toggleList: () => void;
}

const MainFooter = ({ toggleList }: Props) => {
  const { character, updateCharacter } = useContext(GameContext);
  const {
    toggle: showCharacterConfigModal,
    setOff: hideCharacterConfigModal,
    value: isShowingCharacterConfigModal,
  } = useFlipFlop();
  const statsForCurrentLevel = useMemo(() => statsForLevel(character.level), [character]);

  const generateStatChangeHandler = useCallback(
    (statType: StatType) => {
      return (newCurrentValue: number) => {
        // TODO: I think some items make it possible to go above your max class value, we may need to support this
        updateCharacter({
          [statType]: newCurrentValue,
        });
      };
    },
    [updateCharacter]
  );

  return (
    <>
      <FooterContainer>
        <CharacterSection onClick={showCharacterConfigModal}>
          <div style={{ display: "flex", flexFlow: "column nowrap" }}>
            <LevelText>Level {character.level}</LevelText>
            <FactionText faction={character.faction} />
            <ClassText heroClass={character.heroClass} />
          </div>
        </CharacterSection>
        <StatSection>
          <EditableStat
            statName="health"
            currentValue={character.health}
            maxValue={statsForCurrentLevel.health}
            onStatChange={generateStatChangeHandler("health")}
          />
          <EditableStat
            statName="energy"
            currentValue={character.energy}
            maxValue={statsForCurrentLevel.energy}
            onStatChange={generateStatChangeHandler("energy")}
          />
          <EditableStat
            statName="gold"
            currentValue={character.gold}
            onStatChange={generateStatChangeHandler("gold")}
          />
        </StatSection>
        <ToggleListSection>
          <ToggleListButton role="button" src={ToggleIcon} onClick={toggleList} />
        </ToggleListSection>
      </FooterContainer>
      {isShowingCharacterConfigModal ? (
        <Modal onClose={hideCharacterConfigModal}>
          <CharacterConfigModalContent onClose={hideCharacterConfigModal} />
        </Modal>
      ) : null}
    </>
  );
};

export default MainFooter;
