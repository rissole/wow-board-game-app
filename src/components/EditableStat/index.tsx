import styled from "styled-components";
import healthIconPath from "./health.jpg";

export interface Props {
    statName: 'health' | 'energy' | 'gold';
    currentValue: number;
    maxValue?: number;
}

const EditableStat = (props: Props) => {
    return (
        <Container>
            <Icon path={healthIconPath}/>
            {props.currentValue}{props.maxValue !== undefined ? `/${props.maxValue}` : ``}
        </Container>
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
