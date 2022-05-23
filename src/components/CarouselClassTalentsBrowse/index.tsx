import { getAllTalents } from "../../data-accessor";
import CardTalent from "../CardTalent";
import Carousel, { CarouselItem } from "../Carousel";
import { UniqueTalentName } from "../../types";

export interface Props {
  onClose: () => void;
  talentsToShow?: UniqueTalentName[];
}

export default function BrowseTalents(props: Props) {
  const renderedTalents: CarouselItem[] = getAllTalents()
    .filter((talent) => (props.talentsToShow ? props.talentsToShow.includes(talent.name) : true))
    .map((talent) => ({
      name: talent.name,
      renderNode: () => <CardTalent title={talent.name} description={talent.rawDescription} />,
    }));

  return <Carousel onClose={props.onClose} items={renderedTalents} />;
}
