import { useContext } from "react";
import styled from "styled-components";
import { isValidLevel } from "../../../types";
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: "1" }}>
          Stats per level table
        </div>
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
  flex-flow: row nowrap;
  padding: 8px;
  gap: 8px;
`;
