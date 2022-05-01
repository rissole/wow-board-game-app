import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  description: string;
}

const SpellCarouselCard = styled.div`
  width: 80vw;
  padding: 16px;
  height: 60vh;
  text-align: center;
  background-color: #fff;
  border: 1px solid #000;
`;

const CardSpell = ({ title, description }: Props) => {
  return (
    <SpellCarouselCard>
      <h1>{title}</h1>
      <p>{description}</p>
    </SpellCarouselCard>
  );
};

export default CardSpell;
