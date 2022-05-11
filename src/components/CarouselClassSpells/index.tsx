import { useContext } from "react";
import Carousel from "../Carousel";
import CardSpell from "../CardSpell";
import { powers } from "../../data-accessor";
import { CardId } from "../../types";
import { GameContext } from "../GameProvider";

export interface Props {
  onClose: () => void;
  onSelectItem: (id: CardId) => void;
}
export interface Spell {
  icon: string;
  name: string;
  description: string;
}

// Display available class spells
export default function EquipClassSPells({ onClose, onSelectItem }: Props) {
  const { powers: ownedPowers } = useContext(GameContext);

  const unavailablePowers = ownedPowers.map((power) => power.id);
  const availablePowers = powers
    .filter((power) => !unavailablePowers.includes(power.name))
    .map((power) => ({
      id: power.name,
      renderNode: () => <CardSpell title={power.name} description={power.rawDescription} />,
    }));

  return <Carousel items={availablePowers} onClose={onClose} onSelectItem={onSelectItem} buttonText="Train" />;
}
