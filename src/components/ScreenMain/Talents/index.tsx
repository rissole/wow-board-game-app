import styled from "styled-components";
import COLORS from "../../../util/colors";
import { useCallback, useContext } from "react";
import { GameContext, TalentState } from "../../GameProvider";
import Icon from "../../Icon";
import { UniqueCardName, CharacterLevel, UniqueTalentName, HeroClass } from "../../../types";
import samwisePath from "../../../assets/samwise.png";
import { ALL_TALENTS } from "../../../data-accessor";
import useFlipFlop from "../../useFlipFlop";
import SelectTalents from "../../CarouselClassTalentsSelect";
import BrowseTalents from "../../CarouselClassTalentsBrowse";
import { heroClassIconMap } from "../../ScreenCharacterSelect";

const Container = styled.div`
  width: 100%;
  text-align: center;
  background-color: ${COLORS.backgroundPrimary};
  height: 80px;
`;

const TalentDisplay = styled.div`
  padding-top: 4px;
  display: flex;
  justify-content: space-evenly;
`;

interface IconProps {
  talentLevel: CharacterLevel;
  currentLevel: CharacterLevel;
  talents: TalentState;
  addTalent: (level: CharacterLevel, name: UniqueTalentName) => void;
  heroClass: HeroClass;
}

function getIconPath(talentName: UniqueTalentName | undefined, heroClass: HeroClass): string {
  if (talentName !== undefined) {
    return ALL_TALENTS[talentName]?.iconLink ?? samwisePath;
  } else {
    return heroClassIconMap[heroClass];
  }
}

const TalentIcon = (props: IconProps) => {
  const { toggle: showTalentSelect, setOff: hideTalentSelect, value: isShowingTalentSelect } = useFlipFlop();
  const { toggle: showTalentView, setOff: hideTalentView, value: isShowingTalentView } = useFlipFlop();

  const onSelectTalent = useCallback(
    (talentSelected: UniqueCardName) => {
      props.addTalent(props.talentLevel, talentSelected);
      hideTalentSelect();
    },
    [props, hideTalentSelect]
  );

  const equippedTalent = props.talents[props.talentLevel];
  const talentUnlocked = props.currentLevel >= props.talentLevel;
  const isTalentUnlockedAndEmpty = equippedTalent === undefined && talentUnlocked;
  return (
    <TalentIconInner>
      <Icon
        path={getIconPath(equippedTalent, props.heroClass)}
        height={36}
        width={36}
        onClick={
          isTalentUnlockedAndEmpty ? showTalentSelect : equippedTalent !== undefined ? showTalentView : undefined
        }
        style={{ filter: talentUnlocked ? undefined : "brightness(0.4)" }}
      />
      <TalentText highlight={isTalentUnlockedAndEmpty}>
        {isTalentUnlockedAndEmpty ? "Available" : props.talentLevel}
      </TalentText>
      {isShowingTalentSelect ? (
        <SelectTalents
          onClose={hideTalentSelect}
          onSelect={onSelectTalent}
          maxTalentLevel={props.talentLevel}
          equippedTalents={Object.values(props.talents)}
        />
      ) : null}
      {isShowingTalentView && equippedTalent !== undefined ? (
        <BrowseTalents onClose={hideTalentView} talentsToShow={[equippedTalent]} />
      ) : null}
    </TalentIconInner>
  );
};

const Talents = () => {
  const { talents, character, addTalent } = useContext(GameContext);
  return (
    <Container>
      <small>Talents</small>
      <TalentDisplay>
        <TalentIcon
          talentLevel={2}
          currentLevel={character.level}
          talents={talents}
          addTalent={addTalent}
          heroClass={character.heroClass}
        />
        <TalentIcon
          talentLevel={3}
          currentLevel={character.level}
          talents={talents}
          addTalent={addTalent}
          heroClass={character.heroClass}
        />
        <TalentIcon
          talentLevel={4}
          currentLevel={character.level}
          talents={talents}
          addTalent={addTalent}
          heroClass={character.heroClass}
        />
        <TalentIcon
          talentLevel={5}
          currentLevel={character.level}
          talents={talents}
          addTalent={addTalent}
          heroClass={character.heroClass}
        />
      </TalentDisplay>
    </Container>
  );
};

export default Talents;

const TalentIconInner = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 25%;
`;
const TalentText = styled.small<{ highlight?: boolean }>`
  text-align: center;
  ${(props) => (props.highlight ? `color: ${COLORS.foregroundPrimary}; font-weight: 600` : "")}
`;
