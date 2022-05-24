import { GameState } from "../components/GameProvider"; // just dropping a casual circular dependency here
import { SlotNumber, UniqueCardName } from "../types";

const APP_KEY = "wow-board-game-app";

interface SaveState {
  character: GameState["character"];
  purchasedCards: GameState["purchasedCards"];
  talents: GameState["talents"];
  cardSlots: {
    key: SlotNumber;
    equipped: UniqueCardName[];
  }[];
}

const saveToLocalStorage = (gameState: GameState) => {
  const { character, purchasedCards, talents, cardSlots } = gameState;

  const saveState: SaveState = {
    character,
    purchasedCards,
    talents,
    cardSlots: Object.entries(cardSlots)
      .map(([key, cardSlot]) => ({ key: Number(key) as SlotNumber, equipped: cardSlot.equipped }))
      .filter((c) => c.equipped.length > 0),
  };

  const gameData = JSON.stringify(saveState);
  window.localStorage.setItem(APP_KEY, gameData);
};

const loadFromLocalStorage = (): SaveState | null => {
  const gameData = window.localStorage.getItem(APP_KEY);
  if (!gameData) {
    return null;
  }
  return JSON.parse(gameData);
};

export { saveToLocalStorage, loadFromLocalStorage };
