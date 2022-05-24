import { getTalentsForLevel } from "../../data-accessor";
import CardTalent from "../CardTalent";
import Carousel, { CarouselItem } from "../Carousel";
import { UniqueCardName, CharacterLevel, UniqueTalentName } from "../../types";

export interface Props {
  onClose: () => void;
  onSelectItem: (id: UniqueCardName) => void;
  maxTalentLevel: CharacterLevel;
  equippedTalents: UniqueTalentName[];
}

export default function SelectTalents(props: Props) {
  const renderedTalents: CarouselItem[] = getTalentsForLevel(props.maxTalentLevel)
    .filter((talent) => !props.equippedTalents.includes(talent.name))
    .map((talent) => ({
      name: talent.name,
      renderNode: () => <CardTalent talent={talent} key={talent.name} />,
    }));

  return <Carousel onClose={props.onClose} onSelectItem={props.onSelectItem} items={renderedTalents} />;
}
