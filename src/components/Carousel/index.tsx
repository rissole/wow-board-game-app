import React, { ReactNode, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useSwipeable, DEFAULT_CONFIGURATION } from "../useSwipeable";
import Modal from "../Modal";

const OFFSET_PER_NODE = DEFAULT_CONFIGURATION.offsetPerNode;

export interface CarouselItem {
  title: string;
  node: ReactNode;
}

interface Props {
  onClose: () => void;
  onSelectItem: (item: CarouselItem) => void;
  items: CarouselItem[];
  buttonText?: string;
}

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

const CarouselSelectButton = styled.button`
  width: 200px;
  height: 80px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 36px;
  font-weight: bold;
  background-color: rgb(0, 190, 0);

  &:active {
    background-color: rgb(0, 150, 0);
  }
`;

const CarouselTitle = styled.h1`
  color: white;
  text-shadow: 2px 2px black;
  text-align: center;
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
    color: white;
    opacity: 0.7;
  }
`;

export default function Carousel({ items, onClose, onSelectItem, buttonText = "Select" }: Props) {
  const { offset, handleSwipeStart, handleSwipe, handleSwipeEnd } = useSwipeable(items.length, {
    offsetPerNode: OFFSET_PER_NODE,
  });

  const currentItemIndex = useMemo(() => Math.round(offset / OFFSET_PER_NODE), [offset]);
  const currentItemName = items[currentItemIndex]?.title;

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
    onSelectItem(currentItem);
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
          <CarouselTitle>{currentItemName}</CarouselTitle>
          <CarouselCloseButton role="button" onClick={onClose} />
        </div>
        <CarouselMain>
          {items.map((item, index) => {
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
                {item.node}
              </NodeWrapper>
            );
          })}
        </CarouselMain>
        <CarouselFooter>
          <CarouselSelectButton type="button" onClick={onSelect}>
            <span>{buttonText}</span>
          </CarouselSelectButton>
        </CarouselFooter>

        <div>{/* TODO: Show the name of the current card */}</div>
      </CarouselContainer>
    </Modal>
  );
}

const NodeWrapper = styled.div({
  position: "absolute",
});
