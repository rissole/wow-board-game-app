import { GameContextType } from "../components/GameProvider";
import { UniqueCardName } from "../types";

export function getEquippableCards<AllListValueType extends { name: UniqueCardName }>(
  ALL_LIST: ReadonlyArray<AllListValueType>,
  purchasedCards: GameContextType["purchasedCards"],
  cardSlots: GameContextType["cardSlots"]
) {
  return ALL_LIST.filter(
    (card) =>
      purchasedCards.includes(card.name) && !Object.values(cardSlots).some((slot) => slot.equipped.includes(card.name))
  );
}
