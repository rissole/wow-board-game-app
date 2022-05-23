import { getTalentsForLevel } from "../../data-accessor";
import CardTalent from "../CardTalent";
import Carousel, { CarouselItem } from "../Carousel";
import { UniqueCardName, CharacterLevel, UniqueTalentName } from "../../types";

export interface Props {
  onClose: () => void;
  onSelect: (id: UniqueCardName) => void;
  maxTalentLevel: CharacterLevel;
  equippedTalents: UniqueTalentName[];
}

export default function SelectTalents(props: Props) {
  const renderedTalents: CarouselItem[] = getTalentsForLevel(props.maxTalentLevel)
    .filter((talent) => !props.equippedTalents.includes(talent.name))
    .map((talent) => ({
      name: talent.name,
      renderNode: () => <CardTalent title={talent.name} description={talent.rawDescription} />,
    }));

  return <Carousel onClose={props.onClose} onSelect={props.onSelect} items={renderedTalents} />;
}
