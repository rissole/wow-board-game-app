import { useContext } from "react";
import Carousel, { CarouselItem } from "../Carousel";
import CardSpell from "../CardSpell";
import { UniqueCardName } from "../../types";
import { GameContext } from "../GameProvider";
import { ALL_POWERS } from "../../data-accessor";
import { getEquippableCards } from "../../util/data";

export interface Props {
  onClose: () => void;
  onSelectItem: (id: UniqueCardName) => void;
}
export interface Spell {
  icon: string;
  name: string;
  description: string;
}

export default function EquipCarousel({ onClose, onSelectItem }: Props) {
  const { purchasedCards, cardSlots } = useContext(GameContext);

  const equippableCards: CarouselItem[] = getEquippableCards(ALL_POWERS, purchasedCards, cardSlots).map((p) => {
    return {
      name: p.name,
      renderNode: () => <CardSpell title={p.name} description={p.rawDescription} />,
    };
  });

  return <Carousel items={equippableCards} onClose={onClose} onSelectItem={onSelectItem} buttonText="Train" />;
}
