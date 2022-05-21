import { useContext } from "react";
import Carousel, { CarouselItem } from "../Carousel";
import CardSpell from "../CardSpell";
import { ALL_POWERS } from "../../data-accessor";
import { UniqueCardName } from "../../types";
import { GameContext } from "../GameProvider";

export interface Props {
  onClose: () => void;
  onSelectItem: (id: UniqueCardName) => void;
}
export interface Spell {
  icon: string;
  name: string;
  description: string;
}

// Display available class spells
export default function EquipClassSpells({ onClose, onSelectItem }: Props) {
  const { purchasedCards } = useContext(GameContext);

  const availablePowers: CarouselItem[] = ALL_POWERS.filter((power) => !purchasedCards.includes(power.name)).map(
    (power) => ({
      name: power.name,
      renderNode: () => <CardSpell title={power.name} description={power.rawDescription} />,
    })
  );

  return <Carousel items={availablePowers} onClose={onClose} onSelectItem={onSelectItem} buttonText="Train" />;
}
