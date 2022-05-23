import styled from "styled-components";
import { Faction } from "../../../types";
import COLORS from "../../../util/colors";
import { toTitleCase } from "../../../util/string";

interface Props {
  faction: Faction;
}

const FactionText = ({ faction }: Props) => {
  return <TextContainer color={COLORS[faction]}>{toTitleCase(faction)}</TextContainer>;
};

export default FactionText;

const TextContainer = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 18px;
`;
