import { useCallback, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import Icon from "../Icon";
import CostBox from "../CostBox";
import BaseCharacterSheetSlot from "../BaseCharacterSheetSlot";
import AttributesImpactedView from "../AttributesImpacted";
import SlotTypeIcons from "../SlotTypeIcons";
import { SLOT_TYPE_TO_COLOR } from "../SlotTypeIcons/util";
import { GameContext } from "../GameProvider";
import { getPowerByName } from "../../data-accessor";
import { Power } from "../../types";
import Carousel, { CarouselItem } from "../Carousel";
import PowerCarouselCard from "../PowerCarouselCard";

const InventoryList = () => {
  const { purchasedCards, cardSlots } = useContext(GameContext);
  const [selectedCardForModal, setSelectedCardForModal] = useState<CarouselItem | null>(null);

  // All cards which are purchased but not equipped in a slot
  // TODO: Handle duplicate cards if required
  const inventoryCards = useMemo(
    () =>
      purchasedCards.filter((cardName) => !Object.values(cardSlots).some((slot) => slot.equipped.includes(cardName))),
    [cardSlots, purchasedCards]
  );

  const inventoryCardsData = inventoryCards.map((cardName) => {
    const p = getPowerByName(cardName);
    if (!p) {
      throw new Error(`Inventory contains invalid card with name: ${cardName}`);
    }
    return p;
  });

  const showCardDetail = useCallback((power: Power) => {
    setSelectedCardForModal({
      name: power.name,
      renderNode: () => <PowerCarouselCard power={power} />,
    });
  }, []);

  const hideCardDetail = useCallback(() => {
    setSelectedCardForModal(null);
  }, []);

  return (
    <>
      {inventoryCardsData.map((cardData, i) => {
        return (
          <BaseCharacterSheetSlot
            key={i}
            backgroundColor={SLOT_TYPE_TO_COLOR[cardData.type.primary]}
            onClick={() => showCardDetail(cardData)}
          >
            <Container>
              <SlotTypeIcons slotTypes={[cardData.type]} />
              <MainContent>
                <Icon path={cardData.iconLink} height={36} width={36} />
                <CostBox cost={cardData.energyCost} />
                <NameBox>{cardData.name}</NameBox>
                <AttributesImpactedView attributesImpacted={cardData.attributesImpacted} />
              </MainContent>
            </Container>
          </BaseCharacterSheetSlot>
        );
      })}
      {!!selectedCardForModal && (
        <Carousel
          onSelectItem={hideCardDetail}
          onClose={hideCardDetail}
          buttonText="Close"
          items={[selectedCardForModal]}
        />
      )}
    </>
  );
};

export default InventoryList;

const Container = styled.div`
  display: flex;
`;

const NameBox = styled.span`
  max-width: 96px;
  font-weight: 600;
`;

const MainContent = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px;
  flex-grow: 0;
`;
