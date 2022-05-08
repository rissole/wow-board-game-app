import { useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import EditableStat from "../../EditableStat";
import { statsForLevel } from "../../../data-accessor";
import { GameContext } from "../../GameProvider";
import ToggleIcon from "../../../assets/samwise.png";
import FactionText from "./FactionText";
import ClassText from "./ClassText";
import NumberEditModal, { ModalProps } from "../../NumberEditModal";
import Modal from "../../Modal";
import useFlipFlop from "../../useFlipFlop";
import { CharacterLevel, StatType, isValidLevel } from "../../../types";

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: white;
`;

const CharacterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatSection = styled.div``;

const ToggleListSection = styled.div``;

const ToggleListButton = styled.img`
  width: 48px;
  height: 48px;
`;

const LevelText = styled.span`
  font-weight: bold;
`;

const MainFooter = () => {
  const { character, updateCharacter } = useContext(GameContext);
  const { toggle: showLevelUpModal, setOff: hideLevelUpModal, value: isShowingLevelUpModal } = useFlipFlop();
  const statsForCurrentLevel = useMemo(() => statsForLevel(character.level), [character]);

  // TODO: Rework the level up experience so that users don't accidentally lose their current health/energy stats
  // Currently we update your stats immediately once you modify your level in the modal
  const updateCharacterLevel = useCallback(
    (newLevel: CharacterLevel) => {
      const newStats = statsForLevel(newLevel);
      updateCharacter({
        level: newLevel,
        health: newStats.health,
        energy: newStats.energy,
      });
    },
    [updateCharacter]
  );

  const numberEditModalValues = useMemo<ModalProps["values"]>(
    () => [
      {
        value: character.level,
        onValueChange: (v: number) => {
          if (isValidLevel(v)) {
            updateCharacterLevel(v);
          }
        },
        maxValueAllowed: 5,
        minValueAllowed: 1,
      },
    ],
    [character.level, updateCharacterLevel]
  );

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
        <CharacterSection onClick={showLevelUpModal}>
          <LevelText>Level {character.level}</LevelText>
          <FactionText faction={character.faction} />
          <ClassText heroClass={character.heroClass} />
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
          <ToggleListButton role="button" src={ToggleIcon} />
        </ToggleListSection>
      </FooterContainer>
      {isShowingLevelUpModal ? (
        <Modal onClose={hideLevelUpModal}>
          <NumberEditModal name="Level" values={numberEditModalValues} />
        </Modal>
      ) : null}
    </>
  );
};

export default MainFooter;
