import styled from "styled-components";
import healthIconPath from "./health.jpg";
import {useCallback, useMemo, useState} from "react";
import Modal from "../Modal";
import {StatType} from "../../types";
import NumberEditModal from "../NumberEditModal";

export interface Props {
    statName: StatType;
    currentValue: number;
    onStatChange: (newCurrent: number, newMax?: number) => void
    maxValue?: number;
}

const EditableStat = (props: Props) => {
    const [isShowingModal, setIsShowingModal] = useState(false)
    const handleClick = useCallback(() => {
        setIsShowingModal(true)
    }, [setIsShowingModal])
    const handleModalClose = useCallback(() => {
        setIsShowingModal(false)
    }, [setIsShowingModal])

    const onCurrentValueChange = useCallback((newCurrentValue: number) => {
        props.onStatChange(newCurrentValue, props.maxValue);
    }, [props])

    const onMaxValueChange = useCallback((newMaxValue: number) => {
        props.onStatChange(props.currentValue, newMaxValue);
    }, [props])

    const values = useMemo(() => [{
        value: props.currentValue,
        onValueChange: onCurrentValueChange
    },
        ...(props.maxValue !== undefined ? [{value: props.maxValue, onValueChange: onMaxValueChange}] : [])
    ], [onCurrentValueChange, onMaxValueChange, props.currentValue, props.maxValue])


    return (
        <>
            <Container onClick={handleClick}>
                <Icon path={healthIconPath}/>
                {props.currentValue}{props.maxValue !== undefined ? `/${props.maxValue}` : ``}
            </Container>
            {isShowingModal ? <Modal onClose={handleModalClose}>
                <NumberEditModal name={props.statName} values={values}/>
            </Modal> : null}
        </>
    )
}

const Container = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`

const Icon = styled.div<{ path: string }>`
  background-image: url(${props => props.path});
  background-size: 100% 100%;
  width: 24px;
  height: 24px;
`

export default EditableStat
