import React, { ReactNode, useCallback, useState, useMemo } from "react";
import styled from "styled-components";
import { useSwipeable, DEFAULT_CONFIGURATION } from "../useSwipeable";
import Modal from "../Modal";

const OFFSET_PER_NODE = DEFAULT_CONFIGURATION.offsetPerNode;

interface Props {
  onClose: () => void;
  renderNode: (index: number) => ReactNode;
}

type CachedNode = {
  node: ReactNode;
  index: number;
};

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

export default function Carousel({ renderNode, onClose }: Props) {
  const [nodeCache, setNodeCache] = useState<CachedNode[]>([]);
  const { offset, handleSwipeStart, handleSwipe, handleSwipeEnd } = useSwipeable({
    offsetPerNode: OFFSET_PER_NODE,
  });

  const getNodeFromCache = useCallback<(index: number) => CachedNode>(
    (index: number) => {
      const cachedNode = nodeCache.find((cn) => cn.index === index);
      if (cachedNode !== undefined) {
        return cachedNode;
      } else {
        const node = renderNode(index);
        setNodeCache((cache) => [...cache, { index, node }]);
        return { index, node };
      }
    },
    [nodeCache, renderNode]
  );

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

  const currentNodeIndex = useMemo(() => Math.round(offset / OFFSET_PER_NODE), [offset]);
  const nodesToRender = Array.from({ length: 50 }).map((_, i) => getNodeFromCache(i));

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
          <h1 style={{ textAlign: "center", color: "red" }}>Card #{currentNodeIndex}</h1>
        </div>
        {nodesToRender.map((cn, i) => {
          const x = cn.index * OFFSET_PER_NODE - offset;
          const scale = 1 - Math.abs(x / 400);

          if (scale < 0) {
            return null;
          }

          return (
            <NodeWrapper
              key={i}
              style={{
                top: "10vh",
                left: `calc(${x}px + 10vw)`,
                transform: `scale(${scale}, ${scale})`,
                zIndex: Math.floor(scale * 100),
              }}
            >
              {cn.node}
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
