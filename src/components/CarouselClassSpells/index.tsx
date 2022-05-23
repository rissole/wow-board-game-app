import { useContext } from "react";
import Carousel, { CarouselItem, ValidatedSelectedItem } from "../Carousel";
import PowerCarouselCard from "../PowerCarouselCard";
import { ALL_POWERS } from "../../data-accessor";
import { UniqueCardName } from "../../types";
import { GameContext } from "../GameProvider";

export interface Props {
  onClose: () => void;
  onSelectItem: (id: UniqueCardName) => void;
  canTrainSpell: (id: UniqueCardName) => ValidatedSelectedItem;
}
export interface Spell {
  icon: string;
  name: string;
  description: string;
}

// Display available class spells
export default function EquipClassSpells({ onClose, onSelectItem, canTrainSpell }: Props) {
  const { purchasedCards } = useContext(GameContext);

  const availablePowers: CarouselItem[] = ALL_POWERS.filter((power) => !purchasedCards.includes(power.name)).map(
    (power) => ({
      name: power.name,
      renderNode: () => <PowerCarouselCard power={power} />,
    })
  );

  return (
    <Carousel
      items={availablePowers}
      onClose={onClose}
      onSelectItem={onSelectItem}
      isAbleToSelect={canTrainSpell}
      buttonText="Train"
    />
  );
}
