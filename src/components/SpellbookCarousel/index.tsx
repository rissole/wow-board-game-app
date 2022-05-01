import Carousel from "../Carousel";
import CardSpell from "../CardSpell";

export interface Props {
  onClose: () => void;
}
export interface Spell {
  icon: string;
  name: string;
  description: string;
}

const PLACEHOLDER_SPELLS = Array.from({ length: 50 }).map((_, i) => ({
  title: `Claw ${i + 1}`,
  node: <CardSpell title={`Claw ${i + 1}`} description={`Deals ${i + 1} damage`} />,
}));

export default function SpellbookCarousel({ onClose }: Props) {
  return <Carousel items={PLACEHOLDER_SPELLS} onClose={onClose} />;
}
