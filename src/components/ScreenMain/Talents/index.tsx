import styled from "styled-components";
import COLORS from "../../../util/colors";
import { useCallback, useContext } from "react";
import { GameContext, TalentState } from "../../GameProvider";
import Icon from "../../Icon";
import { UniqueCardName, CharacterLevel, UniqueTalentName } from "../../../types";
import samwisePath from "../../../assets/samwise.png";
import lockPath from "../../../assets/lock-icon.svg";
import { ALL_TALENTS } from "../../../data-accessor";
import useFlipFlop from "../../useFlipFlop";
import SelectTalents from "../../CarouselClassTalentsSelect";
import BrowseTalents from "../../CarouselClassTalentsBrowse";

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
}

function getIconPath(
  talentName: UniqueTalentName | undefined,
  talentLevel: CharacterLevel,
  currentLevel: CharacterLevel
): string {
  if (talentName !== undefined) {
    return ALL_TALENTS[talentName]?.iconLink ?? samwisePath;
  } else if (talentLevel <= currentLevel) {
    return samwisePath;
  } else {
    return lockPath;
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
  return (
    <div>
      <Icon
        path={getIconPath(equippedTalent, props.talentLevel, props.currentLevel)}
        height={40}
        width={40}
        onClick={
          equippedTalent === undefined && talentUnlocked
            ? showTalentSelect
            : equippedTalent !== undefined
            ? showTalentView
            : undefined
        }
      />
      {props.talentLevel}
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
    </div>
  );
};

const Talents = () => {
  const { talents, character, addTalent } = useContext(GameContext);
  return (
    <Container>
      <div>Talents</div>
      <TalentDisplay>
        <TalentIcon talentLevel={2} currentLevel={character.level} talents={talents} addTalent={addTalent} />
        <TalentIcon talentLevel={3} currentLevel={character.level} talents={talents} addTalent={addTalent} />
        <TalentIcon talentLevel={4} currentLevel={character.level} talents={talents} addTalent={addTalent} />
        <TalentIcon talentLevel={5} currentLevel={character.level} talents={talents} addTalent={addTalent} />
      </TalentDisplay>
    </Container>
  );
};

export default Talents;
