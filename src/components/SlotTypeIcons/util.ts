import armorPath from "../EquippedCharacterSheetSlot/armor_icon.jpg";
import generalPath from "../EquippedCharacterSheetSlot/general_icon.jpeg";
import placeholderPath from "../../assets/samwise.png";
import activeSpellPath from "../EquippedCharacterSheetSlot/active_spell_icon.jpg";
import instantSpellPath from "../EquippedCharacterSheetSlot/instant_spell_icon.jpg";
import weaponPath from "../EquippedCharacterSheetSlot/weapon_icon.jpg";
import { SlotPrimaryType } from "../../types";
import COLORS from "../../util/colors";

export const SLOT_TYPE_TO_ICON_PATH: Record<SlotPrimaryType, string> = {
  armor: armorPath,
  general: generalPath,
  racial: placeholderPath,
  active: activeSpellPath,
  instant: instantSpellPath,
  weapon: weaponPath,
};

export const SLOT_TYPE_TO_COLOR: Record<SlotPrimaryType, string> = {
  active: COLORS.backgroundTypeActive,
  instant: COLORS.backgroundTypeInstant,
  weapon: COLORS.backgroundTypeWeapon,
  armor: COLORS.backgroundTypeArmor,
  general: COLORS.background,
  racial: COLORS.background,
};
