import styled from "styled-components";
import { HeroClass } from "../../../types";

interface Props {
  heroClass: HeroClass;
}

const ClassColorText = styled.span`
  color: ${(props) => props.color || "#000000"};
`;

const CLASS_TO_COLOR: { [key in HeroClass]: string } = {
  paladin: "pink",
  warlock: "purple",
  rogue: "gold",
  mage: "cyan",
  hunter: "green",
  druid: "orange",
  warrior: "brown",
  shaman: "blue",
  priest: "#bbb",
};

const ClassText = ({ heroClass }: Props) => {
  const text = heroClass.substring(0, 1).toUpperCase().concat(heroClass.substring(1));
  return <ClassColorText color={CLASS_TO_COLOR[heroClass]}>{text}</ClassColorText>;
};

export default ClassText;

const TextContainer = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 18px;
`;
