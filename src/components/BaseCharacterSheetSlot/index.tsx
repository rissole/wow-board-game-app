import styled from "styled-components";
import COLORS from "../../util/colors";

const CharacterSheetSlot = styled.div`
  background-color: ${COLORS.background};
  width: 100vw;
  height: 55px;
  border-bottom: 1px solid #000000;
  gap: 4px;
  padding: 8px;
  display: flex;
`;

export default CharacterSheetSlot;
