import Icon from "../Icon";
import styled from "styled-components";
import { SlotType } from "../../types";
import { SLOT_TYPE_TO_ICON_PATH } from "./util";

interface Props {
  slotTypes: SlotType[];
}

const SlotTypeIcons = (props: Props) => {
  return (
    <SlotTypeIconsContainer>
      {props.slotTypes.map((slotType, index) => {
        return <Icon path={SLOT_TYPE_TO_ICON_PATH[slotType.primary]} height={18} width={18} key={index} />;
      })}
    </SlotTypeIconsContainer>
  );
};

const SlotTypeIconsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 4px;
  align-items: flex-start;
  padding: 8px 0 8px 8px;
`;

export default SlotTypeIcons;
