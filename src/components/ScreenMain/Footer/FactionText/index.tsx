import styled from "styled-components";
import { Faction } from "../../../../types";

interface Props {
  faction: Faction;
}

const FactionColorText = styled.span`
  color: ${(props) => props.color || "#000000"};
`;

const getFactionColor = (faction: Faction) => {
  switch (faction) {
    case "alliance":
      return "blue";
    case "horde":
    default:
      return "red;";
  }
};

const FactionText = ({ faction }: Props) => {
  const text = faction.substring(0, 1).toUpperCase().concat(faction.substring(1));

  return <FactionColorText color={getFactionColor(faction)}>{text}</FactionColorText>;
};

export default FactionText;
