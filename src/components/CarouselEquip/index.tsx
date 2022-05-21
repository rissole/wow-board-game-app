import { useContext } from "react";
import Carousel, { CarouselItem } from "../Carousel";
import CardSpell from "../CardSpell";
import { UniqueCardName } from "../../types";
import { GameContext } from "../GameProvider";
import { getPowerByName } from "../../data-accessor";

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
  const { purchasedCards } = useContext(GameContext);

  const items: CarouselItem[] = purchasedCards.flatMap((p) => {
    const power = getPowerByName(p);
    return power
      ? [
          {
            name: power.name,
            renderNode: () => <CardSpell title={power.name} description={power.rawDescription} />,
          },
        ]
      : [];
  });

  return <Carousel items={items} onClose={onClose} onSelectItem={onSelectItem} buttonText="Train" />;
}
