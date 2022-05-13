import { useContext } from "react";
import Carousel from "../Carousel";
import CardSpell from "../CardSpell";
import { CardId } from "../../types";
import { GameContext } from "../GameProvider";
import { getPowerById } from "../../data-accessor";

export interface Props {
  onClose: () => void;
  onSelectItem: (id: CardId) => void;
}
export interface Spell {
  icon: string;
  name: string;
  description: string;
}

export default function EquipCarousel({ onClose, onSelectItem }: Props) {
  const { powers } = useContext(GameContext);

  const items = powers.flatMap((p) => {
    const power = getPowerById(p.id);
    return power
      ? [
          {
            id: power.name,
            renderNode: () => <CardSpell title={power.name} description={power.rawDescription} />,
          },
        ]
      : [];
  });

  return <Carousel items={items} onClose={onClose} onSelectItem={onSelectItem} buttonText="Train" />;
}
