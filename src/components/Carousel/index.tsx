import React, { ReactNode, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useSwipeable, DEFAULT_CONFIGURATION } from "../useSwipeable";
import Modal from "../Modal";
import { CardId } from "../../types";
import COLORS from "../../util/colors";
import { BaseButton } from "../../util/styles";

const OFFSET_PER_NODE = DEFAULT_CONFIGURATION.offsetPerNode;

export interface CarouselItem {
  id: CardId;
  renderNode: () => ReactNode;
}

interface Props {
  onClose: () => void;
  onSelectItem: (item: CardId) => void;
  items: CarouselItem[];
  buttonText?: string;
}

export default function Carousel({ items, onClose, onSelectItem, buttonText = "Select" }: Props) {
  const { offset, handleSwipeStart, handleSwipe, handleSwipeEnd } = useSwipeable(items.length, {
    offsetPerNode: OFFSET_PER_NODE,
  });

  const currentItemIndex = useMemo(() => Math.round(offset / OFFSET_PER_NODE), [offset]);

  const onTouchStart = useCallback(
    (event: React.TouchEvent) => {
      handleSwipeStart(event.targetTouches[0].clientX);
    },
    [handleSwipeStart]
  );

  const onTouchMove = useCallback(
    (event: React.TouchEvent) => {
      handleSwipe(event.targetTouches[0].clientX);
    },
    [handleSwipe]
  );

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      handleSwipeEnd();
    },
    [handleSwipeEnd]
  );

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      handleSwipeStart(event.clientX);
    },
    [handleSwipeStart]
  );

  const onMouseMove = useCallback(
    (event: React.MouseEvent) => {
      handleSwipe(event.clientX);
    },
    [handleSwipe]
  );

  const onMouseUp = useCallback(
    (event: React.MouseEvent) => {
      handleSwipeEnd();
    },
    [handleSwipeEnd]
  );

  const onSelect = useCallback(() => {
    const currentItem = items[currentItemIndex];
    onSelectItem(currentItem.id);
  }, [currentItemIndex, items, onSelectItem]);

  return (
    <Modal>
      <CarouselContainer
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <div>
          <CarouselCloseButton role="button" onClick={onClose} />
        </div>
        <CarouselMain>
          {items.length ? (
            items.map((item, index) => {
              const x = index * OFFSET_PER_NODE - offset;
              const scale = 1 - Math.abs(x / 400);

              if (scale < 0) {
                return null;
              }

              return (
                <NodeWrapper
                  key={index}
                  style={{
                    top: "10vh",
                    left: `calc(${x}px + 10vw)`,
                    transform: `scale(${scale}, ${scale})`,
                    zIndex: Math.floor(scale * 100),
                  }}
                >
                  {item.renderNode()}
                </NodeWrapper>
              );
            })
          ) : (
            <EmptyCarouselCard onClick={onClose}>
              <h1>No valid items</h1>
            </EmptyCarouselCard>
          )}
        </CarouselMain>
        <CarouselFooter>
          {items.length ? (
            <CarouselButton type="button" onClick={onSelect}>
              <span>{buttonText}</span>
            </CarouselButton>
          ) : (
            <CarouselButton type="button" onClick={onClose}>
              Close
            </CarouselButton>
          )}
        </CarouselFooter>

        <div>{/* TODO: Show the name of the current card */}</div>
      </CarouselContainer>
    </Modal>
  );
}

const NodeWrapper = styled.div({
  position: "absolute",
});

const EmptyCarouselCard = styled(NodeWrapper)`
  top: 10vh;
  left: 10vw;
  width: 80vw;
  padding: 48px 16px 16px;
  height: 60vh;
  text-align: center;
  background-color: ${COLORS.background};
  color: ${COLORS.foregroundBase};
  display: flex;
  justify-content: center;
`;

const CarouselButton = styled(BaseButton)`
  width: 200px;
  height: 80px;
  font-size: 36px;
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CarouselMain = styled.div`
  width: 100vw;
  height: 60vh;
`;

const CarouselFooter = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const CarouselCloseButton = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  top: 0;
  right: 4px;
  margin-top: -20px;
  &:before {
    content: "\\00d7";
    font-size: 64px;
    opacity: 0.7;
  }
`;
