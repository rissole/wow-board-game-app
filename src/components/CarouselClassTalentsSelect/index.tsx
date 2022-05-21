import { getTalentsForLevel } from "../../data-accessor";
import CardTalent from "../CardTalent";
import Carousel from "../Carousel";
import { CardId, CharacterLevel, TalentId } from "../../types";

export interface Props {
  onClose: () => void;
  onSelectItem: (id: CardId) => void;
  maxTalentLevel: CharacterLevel;
  equippedTalents: TalentId[];
}

export default function SelectTalents(props: Props) {
  const renderedTalents = getTalentsForLevel(props.maxTalentLevel)
    .filter((talent) => !props.equippedTalents.includes(talent.name))
    .map((talent) => ({
      id: talent.name,
      renderNode: () => <CardTalent title={talent.name} description={talent.rawDescription} />,
    }));

  return <Carousel onClose={props.onClose} onSelectItem={props.onSelectItem} items={renderedTalents} />;
}
