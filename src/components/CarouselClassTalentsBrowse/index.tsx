import { getAllTalents } from "../../data-accessor";
import CardTalent from "../CardTalent";
import Carousel from "../Carousel";
import { TalentId } from "../../types";

export interface Props {
  onClose: () => void;
  talentsToShow?: TalentId[];
}

export default function BrowseTalents(props: Props) {
  const renderedTalents = getAllTalents()
    .filter((talent) => (props.talentsToShow ? props.talentsToShow.includes(talent.name) : true))
    .map((talent) => ({
      id: talent.name,
      renderNode: () => <CardTalent title={talent.name} description={talent.rawDescription} />,
    }));

  return <Carousel onClose={props.onClose} onSelectItem={undefined} items={renderedTalents} />;
}
