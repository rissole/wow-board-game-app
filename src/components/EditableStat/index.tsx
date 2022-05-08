import styled from "styled-components";
import healthIconPath from "./health.jpg";
import manaIconPath from "./mana.jpg";
import goldIconPath from "./gold.jpg";
import { useCallback, useMemo, useState } from "react";
import Modal from "../Modal";
import { StatType } from "../../types";
import NumberEditModal from "../NumberEditModal";

const iconPathForStatType = (stat: StatType) => {
  switch (stat) {
    case "health":
      return healthIconPath;
    case "energy":
      return manaIconPath;
    case "gold":
      return goldIconPath;
  }
};

const colorForStatType = (stat: StatType) => {
  switch (stat) {
    case "health":
      return "red";
    case "energy":
      return "blue";
    case "gold":
      return "gold";
  }
};

export interface Props {
  statName: StatType;
  currentValue: number;
  onStatChange: (newCurrent: number) => void;
  maxValue?: number;
}

const EditableStat = (props: Props) => {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const handleClick = useCallback(() => {
    setIsShowingModal(true);
  }, [setIsShowingModal]);
  const handleModalClose = useCallback(() => {
    setIsShowingModal(false);
  }, [setIsShowingModal]);

  const onCurrentValueChange = useCallback(
    (newCurrentValue: number) => {
      props.onStatChange(newCurrentValue);
    },
    [props]
  );

  const values = useMemo(
    () => [
      {
        value: props.currentValue,
        onValueChange: onCurrentValueChange,
        ...(props.maxValue !== undefined ? { maxValueAllowed: props.maxValue } : {}),
      },
    ],
    [onCurrentValueChange, props.currentValue, props.maxValue]
  );

  return (
    <>
      <Container onClick={handleClick} color={colorForStatType(props.statName)}>
        <Icon path={iconPathForStatType(props.statName)}>
          {props.currentValue}
          {props.maxValue !== undefined ? `/${props.maxValue}` : ``}
        </Icon>
      </Container>
      {isShowingModal ? (
        <Modal onClose={handleModalClose}>
          <NumberEditModal name={props.statName} values={values} />
        </Modal>
      ) : null}
    </>
  );
};

const Container = styled.div<{ color: string }>`
  font-size: 28px;
  width: 64px;
  height: 64px;
  border: 2px solid ${(props) => props.color};
  border-radius: 4px;
`;

const Icon = styled.div<{ path: string }>`
  background-image: url(${(props) => props.path});
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;
  font-size: 28px;
  filter: grayscale(50%);
`;

export default EditableStat;
