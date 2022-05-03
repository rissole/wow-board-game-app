import Carousel from "../Carousel";
import CardSpell from "../CardSpell";
import { powers } from "../../data-accessor";

export interface Props {
  onClose: () => void;
  onSelectItem: () => void;
}
export interface Spell {
  icon: string;
  name: string;
  description: string;
}

const PLACEHOLDER_SPELLS = powers.map((power) => ({
  title: power.name,
  node: <CardSpell title={power.name} description={power.rawDescription} />,
}));

export default function SpellbookCarousel({ onClose, onSelectItem }: Props) {
  return <Carousel items={PLACEHOLDER_SPELLS} onClose={onClose} onSelectItem={onSelectItem} buttonText="Train" />;
}
