import { Faction } from "../../../../types";
import COLORS from "../../../../util/colors";
import { toTitleCase } from "../../../../util/string";

interface Props {
  faction: Faction;
}

const FactionText = ({ faction }: Props) => {
  return <span style={{ color: COLORS[faction] }}>{toTitleCase(faction)}</span>;
};

export default FactionText;
