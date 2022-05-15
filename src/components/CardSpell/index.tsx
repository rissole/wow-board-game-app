import styled from "styled-components";
import COLORS from "../../util/colors";

interface Props {
  title: string;
  description: string;
}

const SpellCarouselCard = styled.div`
  width: 80vw;
  padding: 16px;
  height: 60vh;
  text-align: center;
  background-color: ${COLORS.background};
`;

const CardSpell = ({ title, description }: Props) => {
  return (
    <SpellCarouselCard>
      <h1 style={{ color: COLORS.foregroundPrimary }}>{title}</h1>
      <p>{description}</p>
    </SpellCarouselCard>
  );
};

export default CardSpell;
