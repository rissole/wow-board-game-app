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
  items: CarouselItem[];
}

const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const CarouselCloseButton = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  top: 8px;
  right: 8px;
  &:after {
    content: "\\00d7";
    font-size: 48px;
    color: white;
  }
`;

export default function Carousel({ items, onClose }: Props) {
  const { offset, handleSwipeStart, handleSwipe, handleSwipeEnd } = useSwipeable({
    offsetPerNode: OFFSET_PER_NODE,
  });

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

  const currentItemIndex = useMemo(() => Math.round(offset / OFFSET_PER_NODE), [offset]);
  const currentItemName = items[currentItemIndex]?.title;

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
        <CarouselCloseButton onClick={onClose} />
        <div>
          {/* TODO: Show the name of the current card */}
          <h1 style={{ textAlign: "center", color: "red" }}>{currentItemName}</h1>
        </div>
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
      </CarouselContainer>
    </Modal>
  );
}

const NodeWrapper = styled.div({
  position: "absolute",
});
