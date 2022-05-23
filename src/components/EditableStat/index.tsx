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

  const iconPath = useMemo(() => iconPathForStatType(props.statName), [props.statName]);

  const values = useMemo(
    () => [
      {
        value: props.currentValue,
        onValueChange: onCurrentValueChange,
        ...(props.maxValue !== undefined ? { maxValueAllowed: props.maxValue } : {}),
        iconPath,
      },
    ],
    [iconPath, onCurrentValueChange, props.currentValue, props.maxValue]
  );

  return (
    <>
      <Container onClick={handleClick}>
        <Icon path={iconPath}>
          {props.currentValue}
          {props.maxValue !== undefined ? `/${props.maxValue}` : ``}
        </Icon>
      </Container>
      {isShowingModal ? (
        <Modal onClose={handleModalClose}>
          <NumberEditModal name={props.statName} values={values} iconPath={iconPath} />
        </Modal>
      ) : null}
    </>
  );
};

const Container = styled.div`
  width: 56px;
  height: 56px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const Icon = styled.div<{ path: string }>`
  background-image: url(${(props) => props.path});
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;
  font-size: 24px;
  filter: grayscale(50%);
`;

export default EditableStat;
