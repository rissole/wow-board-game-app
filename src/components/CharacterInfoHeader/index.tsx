import styled from "styled-components";
import Icon from "../Icon";
import healthPath from "./health.jpg";

export interface Props {
    faction: 'alliance' | 'horde';
    class: 'druid' | 'hunter';
}

const CharacterInfoHeader = (props: Props) => {
    return (
        <Container>
            <Icon height={32} width={32} path={healthPath}/>
            <Icon height={32} width={32} path={healthPath}/>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
  gap: 4px;
`

export default CharacterInfoHeader
