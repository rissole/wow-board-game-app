import styled from "styled-components";

export interface Props {
  equipped: boolean;
  slotItem?: string;
  slotAddons?: string[];
}

const CharacterSheetSlot = (props: Props) => {
  return <Container></Container>;
};

const Container = styled.div`
  background-color: #aaa;
  width: 50vw;
  height: 96px;
  border: 1px solid black;
`;

export default CharacterSheetSlot;
