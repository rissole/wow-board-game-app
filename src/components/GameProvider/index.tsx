import React, { createContext, ReactNode, useCallback, useMemo, useState } from "react";
import { HERO_CLASS_CARD_SLOT_METADATA, statsForLevel } from "../../data-accessor";

import {
  CharacterLevel,
  Faction,
  HeroClass,
  UniqueCardName,
  isValidLevel,
  UniqueTalentName,
  CardSlot,
  SlotNumber,
  isValidSlotNumber,
} from "../../types";

export interface CharacterState {
  heroClass: HeroClass;
  faction: Faction;
  level: CharacterLevel;
  health: number;
  energy: number;
  gold: number;
}

type UpdateCharacterArgs =
  | Partial<Omit<CharacterState, "faction" | "heroClass">>
  | Pick<CharacterState, "faction" | "heroClass">;

export type CardSlotState = {
  /**
   * a slot can have multiple card IDs in it (e.g. helmets, armor)
   */
  [slotNumber in SlotNumber]?: CardSlot;
};

export type TalentState = {
  [level in CharacterLevel]?: UniqueTalentName;
};

export type GameContextType = {
  character: CharacterState;
  /**
   * Update the character state to the provided values.
   * Note: if `update` contains only `faction` and `heroClass` it is assumed that
   * the character is being initialised. `health` and `energy` values will be set
   * to their level 1 values, level will be set to 1, and gold will be set to 0.
   */
  updateCharacter: (update: UpdateCharacterArgs) => void;

  /**
   * cards (items or spells) that have been purchased/trained and are available
   * to be placed in a card slot on the character sheet
   */
  purchasedCards: UniqueCardName[];
  addPurchasedCard: (name: UniqueCardName) => void;
  removePurchasedCard: (name: UniqueCardName) => void;
  /**
   * returns true if successfully levelled up, false otherwise
   * (will be false if you try to level up to an invalid level, i.e. beyond max)
   */
  levelUp: () => boolean;
  talents: TalentState;
  addTalent: (level: CharacterLevel, talent: UniqueTalentName) => void;
  cardSlots: CardSlotState;
  /**
   * Equips card to specified slot, by default overwriting whatever was previously in the slot.
   * @param appendCardInsteadOfOverwrite if true, instead of overwriting the slot, the provided card
   * will be equipped *in addition* to the existing cards.
   * @returns the cards that were equipped before the method was run.
   */
  equipCardToSlot: (
    slotNumber: SlotNumber,
    name: UniqueCardName,
    appendCardInsteadOfOverwrite?: boolean
  ) => UniqueCardName[];
  /**
   * Removes card from the specified slot.
   */
  unequipCardFromSlot: (slotNumber: SlotNumber, name: UniqueCardName) => void;
};

const DEFAULT_CHARACTER_STATE: CharacterState = {
  heroClass: "druid",
  faction: "alliance",
  level: 1,
  health: 1,
  energy: 0,
  gold: 0,
};

const DEFAULT_GAME_STATE: GameContextType = {
  character: DEFAULT_CHARACTER_STATE,
  updateCharacter: () => {},
  purchasedCards: [],
  addPurchasedCard: () => {},
  removePurchasedCard: () => {},
  levelUp: () => false,
  talents: {},
  addTalent: () => {},
  cardSlots: {},
  equipCardToSlot: () => [],
  unequipCardFromSlot: () => {},
};

export const GameContext = createContext<GameContextType>(DEFAULT_GAME_STATE);
GameContext.displayName = "GameContext";

const GameProvider = (props: { children: ReactNode }) => {
  const [character, setCharacter] = useState<CharacterState>(DEFAULT_CHARACTER_STATE);
  const [purchasedCards, setPurchasedCards] = useState<UniqueCardName[]>([]);
  const [talents, setTalents] = useState<TalentState>({});
  const [cardSlots, setCardSlots] = useState<CardSlotState>({});

  const updateCharacter = useCallback(
    (update: UpdateCharacterArgs) => {
      // assuming if we are setting faction and hero class we need to initialise card slots.
      const updateToApply: Partial<CharacterState> = { ...update };
      if ("faction" in update && "heroClass" in update) {
        let slotMetadataForClass = HERO_CLASS_CARD_SLOT_METADATA[update.heroClass];
        if (slotMetadataForClass === undefined) {
          console.warn(`No slot metadata for ${update.heroClass}, falling back to druid`);
          // assuming we always have druid
          slotMetadataForClass = HERO_CLASS_CARD_SLOT_METADATA["druid"]!;
        }
        const initialCardSlotState = slotMetadataForClass.reduce<CardSlotState>((accum, metadata, slotNumber) => {
          if (!isValidSlotNumber(slotNumber)) {
            throw new Error(`Found invalid slot number ${slotNumber} when trying to initialise card slots`);
          }
          accum[slotNumber] = { metadata, equipped: [] };
          return accum;
        }, {});
        setCardSlots(initialCardSlotState);

        // initialise starting health and energy to their max values at level 1
        const statsForLevelOne = statsForLevel(1, update.heroClass);
        updateToApply.health = statsForLevelOne.health;
        updateToApply.energy = statsForLevelOne.energy;
        updateToApply.level = 1;
        updateToApply.gold = 0;
      }
      setCharacter((currentCharacter) => {
        return { ...currentCharacter, ...updateToApply };
      });
    },
    [setCharacter]
  );

  const addPurchasedCard = useCallback(
    (name: UniqueCardName) => {
      setPurchasedCards((currentPurchasedCards) => [...currentPurchasedCards, name]);
    },
    [setPurchasedCards]
  );

  const removePurchasedCard = useCallback(
    (name: UniqueCardName) => {
      setPurchasedCards((currentPowers) => currentPowers.filter((purchasedCard) => purchasedCard !== name));
    },
    [setPurchasedCards]
  );

  const equipCardToSlot = useCallback(
    (slotNumber: SlotNumber, name: UniqueCardName, appendCardInsteadOfOverwrite: boolean = false) => {
      const slot = cardSlots[slotNumber];
      if (slot === undefined) {
        throw new Error("Unexpected uninitialized slot");
      }
      const previousEquippedCards = [...slot.equipped];
      setCardSlots({
        ...cardSlots,
        [slotNumber]: {
          ...slot,
          equipped: [...(appendCardInsteadOfOverwrite ? previousEquippedCards : []), name],
        },
      });
      return previousEquippedCards;
    },
    [setCardSlots, cardSlots]
  );

  const unequipCardFromSlot = useCallback(
    (slotNumber: SlotNumber, name: UniqueCardName) => {
      const slot = cardSlots[slotNumber];
      if (slot === undefined) {
        throw new Error("Unexpected uninitialized slot");
      }
      const previousEquippedCards = [...slot.equipped];
      setCardSlots({
        ...cardSlots,
        [slotNumber]: {
          ...slot,
          equipped: slot.equipped.filter((c) => c !== name),
        },
      });
      return previousEquippedCards;
    },
    [cardSlots]
  );

  const levelUp = useCallback(() => {
    const newLevel = character.level + 1;
    if (isValidLevel(newLevel)) {
      const newStats = statsForLevel(newLevel, character.heroClass);
      updateCharacter({
        level: newLevel,
        health: newStats.health,
        energy: newStats.energy,
      });
      return true;
    }
    return false;
  }, [character.heroClass, character.level, updateCharacter]);

  const addTalent = useCallback(
    (level: CharacterLevel, talent: UniqueTalentName) => {
      setTalents((currentTalents) => ({ ...currentTalents, [level]: talent }));
    },
    [setTalents]
  );

  const contextValue = useMemo<GameContextType>(
    () => ({
      character,
      updateCharacter,
      purchasedCards,
      addPurchasedCard,
      removePurchasedCard,
      levelUp,
      talents,
      addTalent,
      cardSlots,
      equipCardToSlot,
      unequipCardFromSlot,
    }),
    [
      character,
      updateCharacter,
      purchasedCards,
      addPurchasedCard,
      removePurchasedCard,
      levelUp,
      talents,
      addTalent,
      cardSlots,
      equipCardToSlot,
      unequipCardFromSlot,
    ]
  );

  return <GameContext.Provider value={contextValue}>{props.children}</GameContext.Provider>;
};

export default GameProvider;
