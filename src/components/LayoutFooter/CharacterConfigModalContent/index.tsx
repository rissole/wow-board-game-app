import { useContext } from "react";
import styled from "styled-components";
import { isValidLevel } from "../../../types";
import { ActionButton } from "../../../util/styles";
import { GameContext } from "../../GameProvider";
import ModalContent from "../../Modal/ModalContent";
import ClassText from "../ClassText";
import FactionText from "../FactionText";

export interface Props {
  onClose?: () => void;
}

const CharacterConfigModalContent = (props: Props) => {
  const { character, levelUp } = useContext(GameContext);
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: "1" }}>
          Stats per level table
        </div>
        <ModalFooter>
          <ButtonsContainer>
            <ActionButton
              type="button"
              aria-disabled={levelUpDisabled}
              onClick={
                levelUpDisabled
                  ? undefined
                  : () => {
                      levelUp();
                      props.onClose?.();
                    }
              }
            >
              Level up
            </ActionButton>
            <ActionButton type="button" buttonStyle="danger" onClick={() => {}}>
              Delete
            </ActionButton>
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
  gap: 8px;
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
  flex-flow: row wrap;
  padding: 8px;
  gap: 8px;
`;
