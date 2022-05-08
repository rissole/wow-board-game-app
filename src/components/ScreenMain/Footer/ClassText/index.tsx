import styled from "styled-components";
import { HeroClass } from "../../../../types";

interface Props {
  heroClass: HeroClass;
}

const ClassColorText = styled.span`
  color: ${(props) => props.color || "black"};
`;

const getClassColor = (heroClass: HeroClass) => {
  switch (heroClass) {
    case "paladin":
      return "pink";
    case "warlock":
      return "purple";
    case "rogue":
      return "gold";
    case "mage":
      return "cyan";
    case "hunter":
      return "green";
    case "druid":
      return "orange";
    case "warrior":
      return "brown";
    case "shaman":
      return "blue";
    case "priest":
      return "#bbb";
    default:
      return "black";
  }
};

const ClassText = ({ heroClass }: Props) => {
  const text = heroClass.substring(0, 1).toUpperCase().concat(heroClass.substring(1));

  return <ClassColorText color={getClassColor(heroClass)}>{text}</ClassColorText>;
};

export default ClassText;
