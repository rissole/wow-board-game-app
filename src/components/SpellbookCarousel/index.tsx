import styled from "styled-components";
import Carousel from "../Carousel";
import healthIconPath from "./health.jpg";

export interface Spell {
  icon: string;
  name: string;
  description: string;
}

const SPELLS: ReadonlyArray<Spell> = Array.from({ length: 50 }).map((_, i) => ({
  icon: healthIconPath,
  name: `Claw ${i + 1}`,
  description: `Deals ${i + 1} damage`,
}));

const renderSpellCarouselCard = (index: number) => <SpellCarouselCard>{SPELLS[index].name}</SpellCarouselCard>;

export default function SpellbookCarousel() {
  return <Carousel renderNode={renderSpellCarouselCard} />;
}

const SpellCarouselCard = styled.div`
  width: 80vw;
  padding: 16px;
  height: 60vh;
  text-align: center;
  background-color: #fff;
  border: 1px solid #000;
`;
