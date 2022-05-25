import { useContext } from "react";
import styled from "styled-components";
import { statsForLevel } from "../../../data-accessor";
import { CharacterLevel, isValidLevel, MAX_CHARACTER_LEVEL } from "../../../types";
import COLORS from "../../../util/colors";
import Button from "../../Button";
import { GameContext } from "../../GameProvider";
import ModalContent from "../../Modal/ModalContent";
import ClassText from "../ClassText";
import FactionText from "../FactionText";

export interface Props {
  onClose?: () => void;
}

const CharacterConfigModalContent = (props: Props) => {
  const { character, levelUp, resetGame } = useContext(GameContext);
  const levelUpDisabled = !isValidLevel(character.level + 1);
  return (
    <ModalContent>
      <ModalMain>
        <InfoSection>
          <div>
            <FactionText faction={character.faction} /> <ClassText heroClass={character.heroClass} />
          </div>
          <div>
            <LevelText>Level {character.level}</LevelText>
          </div>
        </InfoSection>
        <LevelStatsTable>
          <LevelStatRow>
            <LevelStatHeader>Level</LevelStatHeader>
            <LevelStatHeader>Health</LevelStatHeader>
            <LevelStatHeader>Energy</LevelStatHeader>
          </LevelStatRow>
          {Array.from({ length: MAX_CHARACTER_LEVEL }).map((_, levelMinusOne) => {
            const level = (levelMinusOne + 1) as CharacterLevel;
            const stats = statsForLevel(level, character.heroClass);
            return (
              <LevelStatRow isCurrentLevel={level === character.level}>
                <LevelStat>{level}</LevelStat>
                <LevelStat>{stats.health}</LevelStat>
                <LevelStat>{stats.energy}</LevelStat>
              </LevelStatRow>
            );
          })}
        </LevelStatsTable>
        <ModalFooter>
          <ButtonsContainer>
            <Button
              buttonType="action"
              isDisabled={levelUpDisabled}
              onClick={
                levelUpDisabled
                  ? undefined
                  : () => {
                      levelUp();
                      props.onClose?.();
                    }
              }
              shouldConfirm
            >
              Level up
            </Button>
            <Button onClick={resetGame} buttonType="action" buttonStyle="danger" shouldConfirm>
              Reroll
            </Button>
          </ButtonsContainer>
        </ModalFooter>
      </ModalMain>
    </ModalContent>
  );
};

export default CharacterConfigModalContent;

const ModalMain = styled.div`
  height: 66vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 8px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-flow: column wrap;
  text-align: center;
  font-size: 32px;
`;

const LevelText = styled.span`
  font-size: 24px;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 8px;
  gap: 8px;
`;

const LevelStatsTable = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 0 auto;
  padding: 16px;
`;
const LevelStatRow = styled.div<{ isCurrentLevel?: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  flex: 1 1 auto;
  justify-content: space-between;
  gap: 4px;
  align-items: center;
  ${(props) => (props.isCurrentLevel ? `background: rgba(255, 255, 255, 0.1);` : "")}

  &:not(:last-child) {
    border-bottom: 1px solid ${COLORS.foregroundBase};
  }
`;
const LevelStat = styled.div`
  flex: 0 0 33%;
  text-align: center;
`;
const LevelStatHeader = styled.div`
  flex: 0 0 33%;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;
