import styled from "styled-components";
import COLORS from "../../util/colors";

const CharacterSheetSlot = styled.div<{ readonly backgroundColor?: string }>`
  background-color: ${(props) => props.backgroundColor || COLORS.background};
  width: 100vw;
  height: 55px;
  border-bottom: 1px solid #000000;
  gap: 4px;
  display: flex;
`;

export default CharacterSheetSlot;
