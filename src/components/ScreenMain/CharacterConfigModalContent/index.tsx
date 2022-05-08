import { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../../GameProvider";
import ClassText from "../Footer/ClassText";
import FactionText from "../Footer/FactionText";

export interface Props {
  onClose?: () => void;
}

const CharacterConfigModalContent = (props: Props) => {
  const { character, levelUp } = useContext(GameContext);
  return (
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
        TODO stats per level table
      </div>
      <ModalFooter>
        <ButtonsContainer>
          <ActionButton
            role="button"
            onClick={() => {
              levelUp();
              props.onClose?.();
            }}
          >
            Level up
          </ActionButton>
          <ActionButton role="button" type="danger" onClick={() => {}}>
            Reset character
          </ActionButton>
        </ButtonsContainer>
      </ModalFooter>
    </ModalMain>
  );
};

export default CharacterConfigModalContent;

const ModalMain = styled.div`
  width: 80vw;
  height: 66vh;
  background-color: #fff;
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

const ActionButton = styled.div<{ type?: "danger" | "default" }>(({ type = "default" }) => {
  const rgbMap: { [k in typeof type]: string } = { default: "0, 150, 0", danger: "196, 0, 0" };
  return `
  padding: 12px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  background-color: rgb(${rgbMap[type]});
  color: #fff;

  &:active {
    filter: brightness(0.7);
  }`;
});
