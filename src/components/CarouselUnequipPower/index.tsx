import Carousel, { CarouselItem } from "../Carousel";
import PowerCarouselCard from "../PowerCarouselCard";
import { UniqueCardName, Power } from "../../types";
import { getPowerByName } from "../../data-accessor";

export interface Props {
  cards: UniqueCardName[];
  onClose: () => void;
  onSelect: (id: UniqueCardName) => void;
}

export default function UnequipCarousel({ cards, onClose, onSelect }: Props) {
  const unequippableCards: CarouselItem[] = cards
    .map(getPowerByName)
    .filter((p): p is Power => !!p) // i can't believe typescript can't do this properly
    .map((p) => {
      return {
        name: p.name,
        renderNode: () => <PowerCarouselCard power={p} hiddenLabels={["goldCost"]} />,
      };
    });

  return <Carousel items={unequippableCards} onClose={onClose} onSelect={onSelect} buttonContent="Remove" />;
}
