import Icon from "../Icon";
import styled from "styled-components";
import { SlotPrimaryType, SlotType } from "../../types";
import armorPath from "../EquippedCharacterSheetSlot/armor_icon.jpg";
import generalPath from "../EquippedCharacterSheetSlot/general_icon.jpeg";
import placeholderPath from "../../assets/samwise.png";
import activeSpellPath from "../EquippedCharacterSheetSlot/active_spell_icon.jpg";
import instantSpellPath from "../EquippedCharacterSheetSlot/instant_spell_icon.jpg";
import weaponPath from "../EquippedCharacterSheetSlot/weapon_icon.jpg";

interface Props {
  slotTypes: SlotType[];
  isEquippedSlot: boolean;
}

interface ContainerProps {
  isEquippedSlot: boolean;
}

const slotTypeToIcon: Record<SlotPrimaryType, string> = {
  armor: armorPath,
  general: generalPath,
  racial: placeholderPath,
  active: activeSpellPath,
  instant: instantSpellPath,
  weapon: weaponPath,
};

const SlotTypeIcons = (props: Props) => {
  return (
    <SlotTypeIconsContainer isEquippedSlot={props.isEquippedSlot}>
      {props.slotTypes.map((slotType, index) => {
        return (
          <Icon
            path={slotTypeToIcon[slotType.primary]}
            height={props.isEquippedSlot ? 18 : 32}
            width={props.isEquippedSlot ? 18 : 32}
            key={index}
          />
        );
      })}
    </SlotTypeIconsContainer>
  );
};

const SlotTypeIconsContainer = styled.div<ContainerProps>`
  display: flex;
  ${(props) => (props.isEquippedSlot ? "flex-flow: column;" : "")}
  gap: 4px;
`;

export default SlotTypeIcons;
