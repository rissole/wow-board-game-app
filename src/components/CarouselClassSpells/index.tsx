import { useContext } from "react";
import Carousel, { CarouselAction, CarouselItem } from "../Carousel";
import PowerCarouselCard from "../PowerCarouselCard";
import { ALL_POWERS } from "../../data-accessor";
import { GameContext } from "../GameProvider";

export interface Props {
  onClose: () => void;
  onSelect: CarouselAction;
}
export interface Spell {
  icon: string;
  name: string;
  description: string;
}

// Display available class spells
export default function EquipClassSpells({ onClose, onSelect }: Props) {
  const { purchasedCards } = useContext(GameContext);

  const availablePowers: CarouselItem[] = ALL_POWERS.filter((power) => !purchasedCards.includes(power.name)).map(
    (power) => ({
      name: power.name,
      renderNode: () => <PowerCarouselCard power={power} />,
    })
  );

  return <Carousel items={availablePowers} onClose={onClose} onSelect={onSelect} buttonContent="Train" />;
}
