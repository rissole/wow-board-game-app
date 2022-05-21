import Carousel, { CarouselItem } from "../Carousel";
import CardSpell from "../CardSpell";
import { UniqueCardName, Power } from "../../types";
import { getPowerByName } from "../../data-accessor";

export interface Props {
  cards: UniqueCardName[];
  onClose: () => void;
  onSelectItem: (id: UniqueCardName) => void;
}

export default function UnequipCarousel({ cards, onClose, onSelectItem }: Props) {
  const unequippableCards: CarouselItem[] = cards
    .map(getPowerByName)
    .filter((p): p is Power => !!p) // i can't believe typescript can't do this properly
    .map((p) => {
      return {
        name: p.name,
        renderNode: () => <CardSpell title={p.name} description={p.rawDescription} />,
      };
    });

  return <Carousel items={unequippableCards} onClose={onClose} onSelectItem={onSelectItem} buttonText="Remove" />;
}
