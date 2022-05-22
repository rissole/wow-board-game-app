import { GameContextType } from "../components/GameProvider";
import { SlotType, UniqueCardName } from "../types";

export function getEquippableCards<AllListValueType extends { name: UniqueCardName; type: SlotType }>(
  ALL_LIST: ReadonlyArray<AllListValueType>,
  purchasedCards: GameContextType["purchasedCards"],
  cardSlots: GameContextType["cardSlots"],
  validSlotTypes?: ReadonlyArray<SlotType>
) {
  return ALL_LIST.filter(
    (card) =>
      purchasedCards.includes(card.name) &&
      !Object.values(cardSlots).some((slot) => slot.equipped.includes(card.name)) &&
      (validSlotTypes === undefined || validSlotTypes.some((validSlotType) => canFitInSlot(card.type, validSlotType)))
  );
}

export function canFitInSlot(cardSlotType: SlotType, destinationSlotType: SlotType): boolean {
  return (
    cardSlotType.primary === destinationSlotType.primary &&
    // TODO: do proper secondary compatibility check here i.e. cloth armor can go in leather slot
    (cardSlotType.secondary === undefined || cardSlotType.secondary === destinationSlotType.secondary)
  );
}
