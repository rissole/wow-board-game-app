import { useMemo } from "react";
import styled from "styled-components";
import { CharacterLevel, HeroClass, isValidLevel } from "../../types";
import Icon from "../Icon";
import Modal from "../Modal";
import NumberEditModal, { ModalProps } from "../NumberEditModal";
import useFlipFlop from "../useFlipFlop";
import healthPath from "./health.jpg";

export interface Props {
  faction: "alliance" | "horde";
  class: HeroClass;
  level: CharacterLevel;
  setLevel: (newLevel: CharacterLevel) => void;
}

const CharacterInfoHeader = (props: Props) => {
  const { toggle: showLevelUpModal, setOff: hideLevelUpModal, value: isShowingLevelUpModal } = useFlipFlop();

  const numberEditModalValues = useMemo<ModalProps["values"]>(
    () => [
      {
        value: props.level,
        onValueChange: (v: number) => {
          if (isValidLevel(v)) {
            props.setLevel(v);
          }
        },
        maxValueAllowed: 5,
        minValueAllowed: 1,
      },
    ],
    [props]
  );

  return (
    <>
      <Container onClick={showLevelUpModal}>
        <Icon height={32} width={32} path={healthPath} />
        <Icon height={32} width={32} path={healthPath} />
        <LevelSpan>Lvl {props.level}</LevelSpan>
      </Container>
      {isShowingLevelUpModal ? (
        <Modal onClose={hideLevelUpModal}>
          <NumberEditModal name="Level" values={numberEditModalValues} />
        </Modal>
      ) : null}
    </>
  );
};

const Container = styled.div`
  display: flex;
  gap: 4px;
`;

const LevelSpan = styled.span`
  font-size: 18px;
  line-height: 32px;
  vertical-align: middle;
`;

export default CharacterInfoHeader;
